'use server';

import { cacheTag, cacheLife } from 'next/cache';
import getPublicationState from '../../utils/base/getPublicationState';
import { IApp } from '../../types/base/app';
import { IArticleCategory } from '../../types/article';
import providers from '../../providers';
import { FindResponse } from '../../lib/provider/AbstractStrapiProvider';
import { articleCategoryFragment$data } from '../../relay/__generated__/articleCategoryFragment.graphql';
import { STRAPI_MAX_LIMIT } from '../../constants';
import { getArticleCategoryListType } from '../../utils/strapi/getArticleCategoryType';

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
    'use cache';

    if (!app.preview) {
        cacheLife('days');
        cacheTag('article-categories');
    }
    const { skipCategoryId } = options;

    const page = options.page ? Math.max(options.page, 1) : 1;
    const limit = options.limit || STRAPI_MAX_LIMIT;

    const filters: Record<string, any> = {};

    if (skipCategoryId) {
        filters.documentId = { ne: skipCategoryId };
    }

    const { data, count } = (await providers.articleCategory.find({
        locale: app.locale,
        filters: filters,
        start: (page - 1) * limit,
        limit: limit,
        preview: app.preview,
        status: getPublicationState(app.preview),
    })) as unknown as FindResponse<Omit<articleCategoryFragment$data, ' $fragmentType'>[]>;

    return {
        categories: getArticleCategoryListType(data),
        canLoadMore: count > (page - 1) * limit + limit,
    };
};
