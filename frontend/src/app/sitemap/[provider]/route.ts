import dayjs from 'dayjs';
import config from '../../../../sklinet.config.json';
import providers from '../../../providers';
import blocks from '../../blocks/server';
import { StaticPathsParams } from '../../../types/base/staticPathsParams';
import { findProvider } from '../../../utils/base/findProvider';
import { toCamel } from '../../../utils/base/toCamel';

interface SitemapItem {
    url: string;
    changeFrequency: string;
    priority: number;
}

export async function GET(req: Request, context: Record<string, any>) {
    const basepath = process.env.NEXT_PUBLIC_BASE_PATH;
    const { provider } = await context.params;
    const { i18n } = config;
    if (typeof provider !== 'string') {
        return new Response('Sitemap not found', { status: 404 });
    }

    const p = findProvider(provider.replace('.xml', ''));

    if (!p || !p.getStaticPaths) {
        return new Response('Sitemap not found', { status: 404 });
    }

    const items: SitemapItem[] = [];

    for (const locale of i18n.locales) {
        if (p.getApiKey() === 'page') {
            const staticPaths = await providers.page.getStaticPaths(locale, blocks);
            for (const path of staticPaths as unknown as StaticPathsParams[]) {
                if (typeof path !== 'string' && path?.params?.sitemap?.enabled) {
                    if (Array.isArray(path.params.slug)) {
                        const dynamic = !!path.params.slug.find((s: string) => s[0] === ':');
                        if (!dynamic) {
                            items.push({
                                url:
                                    basepath +
                                    (locale === i18n.defaultLocale ? '' : '/' + locale) +
                                    (path.params.slug.length > 0 || locale === i18n.defaultLocale
                                        ? '/' + path.params.slug.join('/')
                                        : ''),
                                changeFrequency: path?.params?.sitemap?.changeFrequency || 'weekly',
                                priority: path?.params?.sitemap?.priority || 0.5,
                            });
                        }
                    } else {
                        items.push({
                            url:
                                basepath +
                                (locale === i18n.defaultLocale ? '' : '/' + locale) +
                                (path.params.slug || locale === i18n.defaultLocale ? '/' + path.params.slug : ''),
                            changeFrequency: path?.params?.sitemap?.changeFrequency || 'weekly',
                            priority: path?.params?.sitemap?.priority || 0.5,
                        });
                    }
                }
            }
        } else {
            const ws = await providers.webSetting.get(locale, false);
            const pageKey = toCamel(p.getApiKey()) + 'DetailPage';
            const webSetting: any = ws;
            if (webSetting && Object.prototype.hasOwnProperty.call(webSetting, pageKey)) {
                const page = webSetting[pageKey];
                const staticPaths = await p.getStaticPaths(locale);
                for (const path of staticPaths as unknown as StaticPathsParams[]) {
                    if (page && typeof path === 'object' && path?.params?.sitemap?.enabled) {
                        const pageObj = page;
                        const pageUrl = pageObj?.url?.includes(':slug')
                            ? pageObj?.url?.replace(':slug', path?.params?.slug || '')
                            : pageObj?.url;
                        items.push({
                            url: basepath + (locale === i18n.defaultLocale ? '/' : '/' + locale + '/') + pageUrl,
                            changeFrequency: path?.params?.sitemap?.changeFrequency || 'weekly',
                            priority: path?.params?.sitemap?.priority || 0.5,
                        });
                    }
                }
            }
        }
    }
    const lastmod = dayjs().startOf('day').format();
    return new Response(
        `<?xml version='1.0' encoding='UTF-8'?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items
    .map(
        (item) => `<url>
<loc>${item?.url}</loc>
<lastmod>${lastmod}</lastmod>
<changefreq>${item?.changeFrequency}</changefreq>
<priority>${item?.priority}</priority>
</url>`,
    )
    .join('\n')}
</urlset>
`,
        {
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
                'Cache-Control': 's-maxage=21600, stale-while-revalidate',
            },
            status: 200,
        },
    );
}
