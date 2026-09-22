'use server';

import { IApp } from '../../../types/base/app';
import { IArticleCategory } from '../../../types/article';
import { getArticleCategoryListType } from '../../../utils/strapi/getArticleCategoryType';
import { cachedArticleCategories } from '../../../utils/cache/fetchData/articleCategories/cached';

/**
 * @description Server action for the category filter row. Same shape as `fetch-articles`: it only
 * resolves params, calls the cached loader and normalizes the result.
 * @param {object} options - Paging and filter selection
 * @param {object} app - Locale and preview flag
 * @returns {Promise<{ categories: IArticleCategory[]; canLoadMore: boolean }>} Normalized categories and the paging flag
 **/
export const fetchArticleCategories = async (
    options: {
        page?: number;
        limit?: number;
        skipCategoryId?: string | null;
    },
    app: { locale?: IApp['locale']; preview: IApp['preview'] },
): Promise<{
    categories: IArticleCategory[];
    canLoadMore: boolean;
}> => {
    const { data, canLoadMore } = await cachedArticleCategories({
        ...options,
        locale: app.locale ?? '',
        preview: app.preview,
    });

    return {
        categories: getArticleCategoryListType(data),
        canLoadMore,
    };
};
