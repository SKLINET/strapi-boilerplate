'use server';

import getPublicationState from '../../utils/getPublicationState';
import { IApp } from '../../types/app';
import { IArticle } from '../../types/article';
import providers from '../../providers';
import { getArticleListType } from '../../utils/strapi/getArticleType';
import { articleListQuery$data } from '../../relay/__generated__/articleListQuery.graphql';

export const fetchArticles = async (
    limit: number,
    app: IApp,
    filters: {
        articleId?: string | null;
        categoryId?: string | null;
    },
): Promise<{
    articles: IArticle[];
    canLoadMore: boolean;
}> => {
    const filter: Record<string, any> = {};

    if (filters.articleId) {
        filter.id = { ne: filters.articleId };
    }

    if (filters.categoryId) {
        filter.category = { id: { eq: filters.categoryId } };
    }

    const { data, count } = await providers.article.find({
        locale: app.locale,
        filter: filter,
        limit: limit,
        preview: app.preview,
        publicationState: getPublicationState(app.preview),
    });

    const _data = data as NonNullable<articleListQuery$data['items']>['data'] | null;

    return {
        articles: getArticleListType(_data, app),
        canLoadMore: count > limit,
    };
};
