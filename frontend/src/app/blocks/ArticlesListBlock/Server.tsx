import { ReactElement } from 'react';
import { ArticlesListBlockProps } from './ArticlesListBlock';
import { ArticleList } from '../../components/blocks/ArticleList/ArticleList';
import { streamListing } from '../../../utils/cache/streamListing';
import { cachedArticlesList } from '../../../utils/cache/fetchData/articlesList/cached';
import { cachedArticleCategories } from '../../../utils/cache/fetchData/articleCategories/cached';
import { getArticleListType } from '../../../utils/strapi/getArticleType';
import { getArticleCategoryListType } from '../../../utils/strapi/getArticleCategoryType';
import { IApp } from '../../../types/base/app';

const DEFAULT_COUNT_ON_PAGE = 5;

/**
 * @description Server component for ArticlesListBlock; reads search params to filter articles by category
 * @param {ArticlesListBlockProps} props - ArticlesListBlock props
 * @returns {Promise<ReactElement>} ArticleList with its data
 **/
const ArticlesListBlockServer = async ({ searchParams, ...rest }: ArticlesListBlockProps): Promise<ReactElement> => {
    // First, before any read. A <Suspense> boundary alone does not keep this listing out of the
    // route's cache entry — the route takes the union of the tags and the minimum cacheLife of every
    // scope that resolved during its prerender, so the collective `article-{locale}` tag would land
    // on the page shell and one publication would discard it. Awaiting a connection defers this
    // subtree to request time instead.
    await streamListing();

    const { filter } = (await searchParams) || {};

    const limit = rest?.blocksData?.countOnPage || DEFAULT_COUNT_ON_PAGE;
    const categoryId = typeof filter === 'string' ? filter : undefined;

    const app = rest.app;
    const loaderOptions = { locale: app?.locale ?? '', preview: app?.preview };

    const [{ data: articleRecords, canLoadMore }, { data: categoryRecords }] = await Promise.all([
        cachedArticlesList({ ...loaderOptions, limit, categoryId }),
        cachedArticleCategories(loaderOptions),
    ]);

    // Cached loaders return raw records; `webSetting` stays out of the cache key and is applied here.
    return (
        <ArticleList
            {...rest}
            data={{
                articles: getArticleListType(articleRecords, app as IApp),
                categories: getArticleCategoryListType(categoryRecords),
                canLoadMore,
            }}
            categoryId={categoryId ?? null}
        />
    );
};

export { ArticlesListBlockServer };
