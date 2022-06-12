import { NextApiRequest, NextApiResponse } from 'next';
import dayjs from 'dayjs';
import { TLSSocket } from 'tls';
import { findProvider } from '@symbio/cms';
import { getUrlFromPage } from '@symbio/headless';
import { toCamel } from '@symbio/headless/utils';
import config from '../../../../sklinet.config.json';
import { webSettingQueryResponse } from '../../../relay/__generated__/webSettingQuery.graphql';
import providers from '../../../providers';
import blocks from '../../../blocks/server';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const basepath = (req.socket instanceof TLSSocket ? 'https' : 'http') + '://' + req.headers.host;
    const { provider } = req.query;
    const { i18n } = config;

    if (typeof provider !== 'string') {
        res.statusCode = 404;
        res.end();
        return;
    }

    const p = findProvider(provider.replace('.xml', ''), providers);

    if (!p || !p.getStaticPaths) {
        res.statusCode = 404;
        res.end();
        return;
    }

    const urls: string[] = [];

    for (const locale of i18n.locales) {
        if (p.getApiKey() === 'page') {
            const staticPaths = await providers.page.getStaticPaths(locale, blocks);
            for (const path of staticPaths) {
                if (typeof path !== 'string') {
                    if (Array.isArray(path.params.slug)) {
                        const dynamic = !!path.params.slug.find((s) => s[0] === ':');
                        if (!dynamic) {
                            urls.push(
                                basepath +
                                    (locale === i18n.defaultLocale ? '' : '/' + locale) +
                                    (path.params.slug.length > 0 || locale === i18n.defaultLocale
                                        ? '/' + path.params.slug.join('/')
                                        : ''),
                            );
                        }
                    } else {
                        urls.push(
                            basepath +
                                (locale === i18n.defaultLocale ? '' : '/' + locale) +
                                (path.params.slug || locale === i18n.defaultLocale ? '/' + path.params.slug : ''),
                        );
                    }
                }
            }
        }
    }

    const lastmod = dayjs().startOf('day').format();

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate');
    res.end(`<?xml version='1.0' encoding='UTF-8'?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urls
    .map(
        (url) => `<url>
<loc>${url}</loc>
<lastmod>${lastmod}</lastmod>
<changefreq>weekly</changefreq>
<priority>0.5</priority>
</url>`,
    )
    .join('\n')}
</urlset>
`);
};

export default handler;
