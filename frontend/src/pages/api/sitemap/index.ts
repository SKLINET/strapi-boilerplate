import { NextApiRequest, NextApiResponse } from 'next';
import { createRelayEnvironment } from '../../../utils/createRelayEnvironment';
import { SitemapArticlesQuery, SitemapPagesQuery } from '../../../relay/page';
import { fetchQuery } from 'relay-runtime';
import { pagesSitemapQuery, pagesSitemapQueryResponse } from '../../../relay/__generated__/pagesSitemapQuery.graphql';
import moment from 'moment';
import getPublicationState from '../../../utils/getPublicationState';
import {
    pageArticlesSitemapQuery,
    pageArticlesSitemapQueryResponse,
} from '../../../relay/__generated__/pageArticlesSitemapQuery.graphql';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const basepath = 'https://' + req.headers.host;
    const urls: string[] = [];
    const currentDate = new Date();
    const timestamp = currentDate.toISOString();

    const environment = createRelayEnvironment({});
    const { pages } = (await fetchQuery<pagesSitemapQuery>(environment, SitemapPagesQuery, {
        publicationState: getPublicationState(),
    }).toPromise()) as pagesSitemapQueryResponse;

    const { articles } = (await fetchQuery<pageArticlesSitemapQuery>(environment, SitemapArticlesQuery, {
        publicationState: getPublicationState(),
        filters: {
            publishDate: { lte: timestamp },
        },
    }).toPromise()) as pageArticlesSitemapQueryResponse;

    if (pages) {
        for (const page of pages.data) {
            const url = page?.attributes?.url || '/';
            if (!page?.attributes?.sitemap?.enabled || String(page?.attributes?.url) === '404') {
                continue;
            }
            const item = {
                url: url === '/' || url === 'homepage' ? '' : `/${url}`,
                lastmod: moment().startOf('day').format(),
                freq: page?.attributes?.sitemap?.changeFrequency || 'daily',
                priority: page?.attributes?.sitemap?.priority || 0.3,
            };

            if (url?.includes(':slug')) {
                if (articles) {
                    for (const a of articles.data) {
                        if (a?.attributes?.sitemap?.enabled) {
                            const newUrl = url.replace(':slug', a?.attributes?.slug || '');
                            urls.push(`<url>
        <loc>${basepath}${newUrl ? newUrl : ''}</loc>
        <lastmod>${item.lastmod}</lastmod>
        <changefreq>${item.freq}</changefreq>
        <priority>${item.priority}</priority>
        </url>`);
                        }
                    }
                }
            } else {
                urls.push(`<url>
                <loc>${basepath}${item.url ? item.url : ''}</loc>
                <lastmod>${item.lastmod}</lastmod>
                <changefreq>${item.freq}</changefreq>
                <priority>${item.priority}</priority>
                </url>`);
            }
        }
    }

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.statusCode = 200;
    res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate');
    res.end(`<?xml version='1.0' encoding='UTF-8'?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`);
};
