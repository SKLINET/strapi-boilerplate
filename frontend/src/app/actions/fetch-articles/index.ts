'use server';

import { IApp } from '../../../types/base/app';
import { IArticle } from '../../../types/article';
import { getArticleListType } from '../../../utils/strapi/getArticleType';
import { cachedArticlesList } from '../../../utils/cache/fetchData/articlesList/cached';

/**
 * @description Server action behind the client-side "load more". It is an entry point, not a cache
 * boundary: a `'use server'` function has to stay a POST endpoint, so the `'use cache'` scope sits
 * one level down in `cachedArticlesList`. The benefit is that client paging hits the same cache
 * entry the server render of the block already filled, instead of going to Strapi every time.
 * @param {object} options - Paging and filter selection
 * @param {object} app - Locale, preview flag and web settings needed to build hrefs
 * @returns {Promise<{ articles: IArticle[]; canLoadMore: boolean }>} Normalized articles and the paging flag
 **/
export const fetchArticles = async (
    options: {
        page?: number;
        start?: number;
        limit?: number;
        skipArticleId?: string | null;
        categoryId?: string | null;
    },
    app: { locale?: IApp['locale']; preview: IApp['preview']; webSetting: IApp['webSetting'] },
): Promise<{
    articles: IArticle[];
    canLoadMore: boolean;
}> => {
    const { data, canLoadMore } = await cachedArticlesList({
        ...options,
        locale: app.locale ?? '',
        preview: app.preview,
    });

    // Normalization runs above the cache boundary on purpose: `getArticleListType` needs the whole
    // `webSetting`, and putting that in the cache key would make any settings change discard every
    // article list entry.
    return {
        articles: getArticleListType(data, app as IApp),
        canLoadMore,
    };
};
