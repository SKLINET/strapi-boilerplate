import { cacheLife } from 'next/cache';
import providers from '../../providers';
import { Provider } from '../../index';
import { cacheTag } from '../../utils/cache/tag';
import config from '../../../sklinet.config.json';

/** Content types whose publication can add or remove an entry from the index. */
const SITEMAP_LIST_TYPES = ['page', 'article'] as const;

/**
 * @description Build the sitemap index. Cached because it is rebuilt from provider metadata on every
 * hit otherwise; any page or article publish expires it through the collective tags below.
 * @param {string} basepath - Public base URL
 * @returns {Promise<string>} Sitemap index XML
 **/
async function getCachedSitemapIndexXml(basepath: string): Promise<string> {
    'use cache';
    cacheLife('default');

    for (const locale of config.i18n.locales) {
        for (const type of SITEMAP_LIST_TYPES) {
            cacheTag(type, { locale });
        }
    }

    return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.values(
        providers,
    )
        .map((provider: Provider) => {
            if (provider?.getApiKey) {
                if (!provider?.isSitemapEnabled()) {
                    return;
                }
                return `<sitemap><loc>${basepath}/sitemap/${provider.getApiKey()}.xml</loc></sitemap>`;
            } else {
                return;
            }
        })
        .join('')}</sitemapindex>`;
}

export async function GET() {
    const basepath = process.env.NEXT_PUBLIC_BASE_PATH;
    const xml = await getCachedSitemapIndexXml(basepath || '');

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 's-maxage=21600, stale-while-revalidate',
        },
        status: 200,
    });
}
