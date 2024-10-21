'use server';

import getPublicationState from '../../utils/base/getPublicationState';
import { IApp } from '../../types/base/app';
import { IArticle } from '../../types/article';
import providers from '../../providers';
import { getArticleListType } from '../../utils/strapi/getArticleType';
import { articleListQuery$data } from '../../relay/__generated__/articleListQuery.graphql';
import { FindResponse } from '../../lib/provider/AbstractStrapiProvider';
import { articleFragment$data } from '../../relay/__generated__/articleFragment.graphql';

export const fetchArticles = async (
    options: {
        page?: number;
        limit: number;
        skipArticleId?: string | null;
        categoryId?: string | null;
    },
    app: IApp,
): Promise<{
    articles: IArticle[];
    canLoadMore: boolean;
}> => {
    const { skipArticleId, categoryId } = options;

    const page = options.page ? Math.max(options.page, 1) : 1;
    const limit = options.limit;

    const filter: Record<string, any> = {};

    if (skipArticleId) {
        filter.id = { ne: skipArticleId };
    }

    if (categoryId) {
        filter.category = { id: { eq: categoryId } };
    }

    const { data, count } = (await providers.article.find({
        locale: app.locale,
        filter: filter,
        start: (page - 1) * limit,
        limit: limit,
        preview: app.preview,
        status: getPublicationState(app.preview),
    })) as unknown as FindResponse<Omit<articleFragment$data, ' $fragmentType'>[]>;

    return {
        articles: getArticleListType(data, app),
        canLoadMore: count > (page - 1) * limit + limit,
    };
};
