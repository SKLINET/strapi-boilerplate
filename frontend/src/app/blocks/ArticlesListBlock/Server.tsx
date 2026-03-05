import { cache, ReactElement } from 'react';
import { ArticlesListBlockProps } from './ArticlesListBlock';
import { SearchParamsProps } from '../../../types/base/page';
import { fetchArticles } from '../../actions/fetch-articles';
import { fetchArticleCategories } from '../../actions/fetch-article-categories';
import { ArticleList } from '../../components/blocks/ArticleList/ArticleList';
import { cacheTag } from '../../../utils/cache/tag';
import { IApp } from '../../../types/base/app';

export interface ArticlesListBlockServerProps extends ArticlesListBlockProps {
    searchParams?: Promise<SearchParamsProps> | undefined;
}

const cachedArticlesList = cache(
    async ({ limit, categoryId, app }: { limit: number; categoryId: string | undefined; app: IApp }) => {
        'use cache';
        cacheTag('article');

        const { articles, canLoadMore } = await fetchArticles(
            { limit: limit, categoryId: categoryId },
            {
                webSetting: app?.webSetting,
                locale: app?.locale,
                preview: app?.preview,
            },
        );

        return { articles, canLoadMore };
    },
);

const cachedArticleCategories = cache(async ({ app }: { app: IApp }) => {
    'use cache';
    cacheTag('article-category');

    const { categories } = await fetchArticleCategories(
        {},
        {
            locale: app?.locale,
            preview: app?.preview,
        },
    );

    return { categories };
});

const ArticlesListBlockServer = async ({ searchParams, ...rest }: ArticlesListBlockProps): Promise<ReactElement> => {
    const { filter } = (await searchParams) || {};

    const limit = rest?.blocksData?.countOnPage || 5;

    const categoryId = typeof filter === 'string' ? filter : undefined;

    const { articles, canLoadMore } = await cachedArticlesList({ limit, categoryId, app: rest.app });
    const { categories } = await cachedArticleCategories({ app: rest.app });

    return <ArticleList {...rest} data={{ articles, categories, canLoadMore }} categoryId={categoryId ?? null} />;
};

export { ArticlesListBlockServer };
