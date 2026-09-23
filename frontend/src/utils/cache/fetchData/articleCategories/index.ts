/**
 * Article categories — the filter row above the articles listing.
 */
import providers from '../../../../providers';
import { STRAPI_MAX_LIMIT } from '../../../../constants';
import { FindResponse } from '../../../../lib/provider/AbstractStrapiProvider';
import { articleCategoryFragment$data } from '../../../../relay/__generated__/articleCategoryFragment.graphql';

export type ArticleCategoryListItem = Omit<articleCategoryFragment$data, ' $fragmentType'>;

/** Every param the category list supports. */
export interface ArticleCategoriesOptions {
    locale: string;
    limit?: number;
    preview?: boolean;
    page?: number;
    skipCategoryId?: string | null;
}

/** Raw records plus the counters the UI needs. Normalization happens at the call site. */
export interface ArticleCategoriesResult {
    data: ReadonlyArray<ArticleCategoryListItem | null>;
    count: number;
    canLoadMore: boolean;
}

/**
 * Uncached read. Use `cachedArticleCategories` unless you explicitly need to bypass the cache.
 * Called without `tags` and with `withoutCache` for the same reason as the article list.
 *
 * @param {ArticleCategoriesOptions} options - Locale, paging and filter selection
 * @returns {Promise<ArticleCategoriesResult>} Raw category records with their counters
 **/
export const fetchArticleCategories = async ({
    locale,
    limit,
    preview = false,
    page,
    skipCategoryId,
}: ArticleCategoriesOptions): Promise<ArticleCategoriesResult> => {
    const safePage = page ? Math.max(page, 1) : 1;
    const safeLimit = limit || STRAPI_MAX_LIMIT;

    const filters: Record<string, unknown> = {};

    if (skipCategoryId) {
        filters.documentId = { ne: skipCategoryId };
    }

    const offset = (safePage - 1) * safeLimit;

    const { data, count } = (await providers.articleCategory.find(
        {
            locale,
            filters,
            start: offset,
            limit: safeLimit,
        },
        { preview, withoutCache: true },
    )) as unknown as FindResponse<ArticleCategoryListItem[]>;

    return {
        data: (data ?? []) as ReadonlyArray<ArticleCategoryListItem | null>,
        count: count ?? 0,
        canLoadMore: (count ?? 0) > offset + safeLimit,
    };
};
