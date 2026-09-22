/**
 * Cached entry point for the article categories. Same two layers as `articlesList/cached.ts`.
 */
import { cache } from 'react';
import { cacheLife } from 'next/cache';
import { cacheTag } from '../../tag';
import { bypassCacheIfPreview } from '../../preview';
import { fetchArticleCategories, type ArticleCategoriesOptions, type ArticleCategoriesResult } from './index';

/** Not exported: `'use cache'` must wrap the raw call, `cache()` then wraps this. */
const cachedArticleCategoriesImpl = async (options: ArticleCategoriesOptions): Promise<ArticleCategoriesResult> => {
    'use cache';
    cacheLife('default');
    // Collective tag only, for the same reason as in `articlesList/cached.ts`.
    cacheTag('article-category', { locale: options.locale });

    return fetchArticleCategories(options);
};

/**
 * The only entry point. Preview skips `'use cache'` entirely.
 *
 * @param {ArticleCategoriesOptions} options - Locale, paging and filter selection
 * @returns {Promise<ArticleCategoriesResult>} Raw category records with their counters
 **/
export const cachedArticleCategories = cache(
    async (options: ArticleCategoriesOptions): Promise<ArticleCategoriesResult> =>
        bypassCacheIfPreview(
            options.preview,
            () => cachedArticleCategoriesImpl(options),
            () => fetchArticleCategories(options),
        ),
);
