/**
 * Cached entry point for the paged article list.
 *
 * Two layers of memoization sit on this call:
 *  - `'use cache'` — the cross-request entry, keyed on the whole options bag, expiring by
 *    `cacheLife` or by one of the tags below;
 *  - `cache()` from React — deduplicates repeated calls with the same arguments inside a single
 *    render, so two blocks asking for the same data hit Strapi once.
 */
import { cache } from 'react';
import { cacheLife } from 'next/cache';
import { cacheTag } from '../../tag';
import { bypassCacheIfPreview } from '../../preview';
import { fetchArticlesList, type ArticlesListOptions, type ArticlesListResult } from './index';

/** Not exported: `'use cache'` must wrap the raw call, `cache()` then wraps this. */
const cachedArticlesListImpl = async (options: ArticlesListOptions): Promise<ArticlesListResult> => {
    'use cache';
    cacheLife('default');
    // The collective tag is the only one this entry needs, and the only one that can work: a list
    // also changes when a record that is *not* in it yet gets published, which no entity tag can
    // express. Deliberately no `tagBlocks` here — the list fragments do not select `__typename`, so
    // it would write nothing today, and would write one tag per record if they ever did.
    cacheTag('article', { locale: options.locale });

    return fetchArticlesList(options);
};

/**
 * The only entry point. Preview skips `'use cache'` entirely so an editor refresh always hits
 * Strapi. Records come back unnormalized: `getArticleListType` needs the whole `webSetting` to build
 * hrefs, and that has no business in a cache key. Callers map them.
 *
 * @param {ArticlesListOptions} options - Locale, paging and filter selection
 * @returns {Promise<ArticlesListResult>} Raw article records with their counters
 **/
export const cachedArticlesList = cache(
    async (options: ArticlesListOptions): Promise<ArticlesListResult> =>
        bypassCacheIfPreview(
            options.preview,
            () => cachedArticlesListImpl(options),
            () => fetchArticlesList(options),
        ),
);
