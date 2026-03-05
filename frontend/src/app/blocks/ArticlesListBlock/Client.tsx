'use client';

import { ReactElement, useState, useEffect, useLayoutEffect, useTransition, useMemo } from 'react';
import { ArticlesListBlockProps } from './ArticlesListBlock';
import { useSearchParams } from 'next/navigation';
import { ArticleList } from '../../components/blocks/ArticleList/ArticleList';
import { fetchArticles } from '../../actions/fetch-articles';
import { IArticle, IArticleCategory } from '../../../types/article';

export interface ArticlesListBlockClientProps extends ArticlesListBlockProps {
    data: {
        articles: IArticle[];
        categories: IArticleCategory[];
        canLoadMore: boolean;
    };
}

const ArticlesListBlockClient = ({
    blocksData,
    app,
    data: { articles, categories, canLoadMore },
}: ArticlesListBlockClientProps): ReactElement => {
    const searchParams = useSearchParams();
    const categoryId = useMemo(() => searchParams.get('filter') || undefined, [searchParams]);

    const [articlesData, setArticlesData] = useState<{ articles: IArticle[]; canLoadMore: boolean } | null>(null);

    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (!categoryId) return;

        fetchArticles(
            { limit: blocksData.countOnPage || 6, categoryId },
            { locale: app.locale, preview: app.preview, webSetting: app.webSetting },
        ).then(setArticlesData);
    }, [categoryId]);

    useLayoutEffect(() => {
        const limit = blocksData.countOnPage || 6;
        const { locale, preview, webSetting } = app;

        startTransition(() => {
            fetchArticles({ limit, categoryId }, { locale, preview, webSetting }).then(setArticlesData);
        });
    }, [categoryId]);

    if (isPending || !articlesData) {
        return <div>Loading...</div>;
    }

    return (
        <ArticleList
            blocksData={blocksData}
            app={app}
            data={{
                articles: articlesData.articles,
                categories,
                canLoadMore: articlesData.canLoadMore,
            }}
            categoryId={categoryId ?? null}
        />
    );
};

export { ArticlesListBlockClient };
