/**
 * Paged article list — the data behind the articles listing block and the client-side "load more".
 */
import providers from '../../../../providers';
import { STRAPI_MAX_LIMIT } from '../../../../constants';
import { FindResponse } from '../../../../lib/provider/AbstractStrapiProvider';
import { articleFragment$data } from '../../../../relay/__generated__/articleFragment.graphql';

export type ArticleListItem = Omit<articleFragment$data, ' $fragmentType'>;

/**
 * Every param the article list supports. One options bag for all callers, so the same selection
 * always produces the same cache key no matter who asks.
 */
export interface ArticlesListOptions {
    locale: string;
    limit?: number;
    preview?: boolean;
    page?: number;
    /** Explicit offset, used when the client has loaded a partial page and resumes mid-list. */
    start?: number;
    skipArticleId?: string | null;
    categoryId?: string | null;
}

/** Raw records plus the counters the UI needs. Normalization happens at the call site. */
export interface ArticlesListResult {
    data: ReadonlyArray<ArticleListItem | null>;
    count: number;
    canLoadMore: boolean;
}

/**
 * Uncached read. Use `cachedArticlesList` unless you explicitly need to bypass the cache.
 *
 * Builds the Strapi filters, resolves the offset and reports whether another page exists. The
 * provider is called **without** `tags` and with `withoutCache`, so the GraphQL POST is `no-store`
 * and the only caching is the `'use cache'` entry wrapping this call. Two cache layers with their
 * own lifetimes over the same data would mean a revalidated outer entry rebuilds itself from a stale
 * inner one.
 *
 * @param {ArticlesListOptions} options - Locale, paging and filter selection
 * @returns {Promise<ArticlesListResult>} Raw article records, the total count, and whether a further page exists
 **/
export const fetchArticlesList = async ({
    locale,
    limit,
    preview = false,
    page,
    start,
    skipArticleId,
    categoryId,
}: ArticlesListOptions): Promise<ArticlesListResult> => {
    const safePage = page ? Math.max(page, 1) : 1;
    const safeLimit = limit || STRAPI_MAX_LIMIT;

    const filters: Record<string, unknown> = {};

    if (skipArticleId) {
        filters.documentId = { ne: skipArticleId };
    }

    if (categoryId) {
        filters.category = { documentId: { eq: categoryId } };
    }

    const offset = start !== undefined ? start : (safePage - 1) * safeLimit;

    const { data, count } = (await providers.article.find(
        {
            locale,
            filters,
            start: offset,
            limit: safeLimit,
        },
        { preview, withoutCache: true },
    )) as unknown as FindResponse<ArticleListItem[]>;

    return {
        data: (data ?? []) as ReadonlyArray<ArticleListItem | null>,
        count: count ?? 0,
        canLoadMore: (count ?? 0) > offset + safeLimit,
    };
};
