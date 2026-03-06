import { ReactElement } from 'react';
import { ArticlesListBlockProps } from './ArticlesListBlock';
import { fetchArticles } from '../../actions/fetch-articles';
import { fetchArticleCategories } from '../../actions/fetch-article-categories';
import { ArticleList } from '../../components/blocks/ArticleList/ArticleList';
import { cacheTag } from '../../../utils/cache/tag';
import { IApp } from '../../../types/base/app';

/**
 * @description Fetch and cache articles
 * @param {number} limit - Limit of articles to fetch
 * @param {string} categoryId - Category ID to filter articles
 * @param {IApp} app - App data
 * @returns {Promise<{articles: IArticle[], canLoadMore: boolean}>} Articles list and can load more flag
 **/
const cachedArticlesList = async ({
    limit,
    categoryId,
    app,
}: {
    limit: number;
    categoryId: string | undefined;
    app: { webSetting: IApp['webSetting']; locale: IApp['locale']; preview: IApp['preview'] };
}) => {
    'use cache';
    cacheTag('article');
    cacheTag('article-category');

    const { articles, canLoadMore } = await fetchArticles(
        { limit: limit, categoryId: categoryId },
        {
            webSetting: app?.webSetting,
            locale: app?.locale,
            preview: app?.preview,
        },
        ['article', 'article-category'],
    );

    return { articles, canLoadMore };
};

/**
 * @description Fetch and cache article categories
 * @param {IApp} app - App data
 * @returns {Promise<{categories: IArticleCategory[]}>} Article categories
 **/
const cachedArticleCategories = async ({
    app,
}: {
    app: { webSetting: IApp['webSetting']; locale: IApp['locale']; preview: IApp['preview'] };
}) => {
    'use cache';
    cacheTag('article-category');

    const { categories } = await fetchArticleCategories(
        {},
        {
            locale: app?.locale,
            preview: app?.preview,
        },
        ['article-category'],
    );

    return { categories };
};

/**
 * @description Server component for ArticlesListBlock use search params to filter articles by category
 * @param {ArticlesListBlockProps} props - ArticlesListBlock props
 * @returns {Promise<ReactElement>} ArticlesListBlock component
 **/
const ArticlesListBlockServer = async ({ searchParams, ...rest }: ArticlesListBlockProps): Promise<ReactElement> => {
    const { filter } = (await searchParams) || {};

    const limit = rest?.blocksData?.countOnPage || 5;

    const categoryId = typeof filter === 'string' ? filter : undefined;

    const { articles, canLoadMore } = await cachedArticlesList({
        limit,
        categoryId,
        app: { webSetting: rest.app?.webSetting, locale: rest.app?.locale, preview: rest.app?.preview },
    });
    const { categories } = await cachedArticleCategories({
        app: { webSetting: rest.app?.webSetting, locale: rest.app?.locale, preview: rest.app?.preview },
    });

    return <ArticleList {...rest} data={{ articles, categories, canLoadMore }} categoryId={categoryId ?? null} />;
};

export { ArticlesListBlockServer };
