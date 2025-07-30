'use server';

import getPublicationState from '../../utils/base/getPublicationState';
import { IApp } from '../../types/base/app';
import { IArticle } from '../../types/article';
import providers from '../../providers';
import { getArticleListType } from '../../utils/strapi/getArticleType';
import { FindResponse } from '../../lib/provider/AbstractStrapiProvider';
import { articleFragment$data } from '../../relay/__generated__/articleFragment.graphql';

export const fetchArticles = async (
    options: {
        page?: number;
        limit: number;
        skipArticleId?: string | null;
        categoryId?: string | null;
    },
    app: { locale: IApp['locale']; preview: IApp['preview']; webSetting: IApp['webSetting'] },
): Promise<{
    articles: IArticle[];
    canLoadMore: boolean;
}> => {
    const { skipArticleId, categoryId } = options;

    const page = options.page ? Math.max(options.page, 1) : 1;
    const limit = options.limit;

    const filters: Record<string, any> = {};

    if (skipArticleId) {
        filters.documentId = { ne: skipArticleId };
    }

    if (categoryId) {
        filters.category = { documentId: { eq: categoryId } };
    }

    const { data, count } = (await providers.article.find({
        locale: app.locale,
        filter: filters,
        start: (page - 1) * limit,
        limit: limit,
        preview: app.preview,
        status: getPublicationState(app.preview),
    })) as unknown as FindResponse<Omit<articleFragment$data, ' $fragmentType'>[]>;

    return {
        articles: getArticleListType(data, app as IApp),
        canLoadMore: count > (page - 1) * limit + limit,
    };
};
