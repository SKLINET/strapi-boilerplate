'use client';

import React, { ReactElement, useState, useEffect, useTransition } from 'react';
import styles from './ArticleList.module.scss';
import clsx from 'clsx';
import { ArticlesListBlockProps } from '../../../blocks/ArticlesListBlock/ArticlesListBlock';
import { getArticleListType } from '../../../../utils/strapi/getArticleType';
import { IArticle } from '../../../../types/article';
import { fetchArticles } from '../../../actions/fetch-articles';
import { getArticleCategoryListType } from '../../../../utils/strapi/getArticleCategoryType';
import { getPageUrl } from '../../../../utils/getPageUrl';
import { Button } from '../../primitives/Button/Button';
import { FadeIn } from '../../base/FadeIn/FadeIn';

const ArticleList = ({
    blocksData: { countOnPage },
    app,
    data: { articles, categories, canLoadMore },
}: ArticlesListBlockProps): ReactElement => {
    const [_articles, setArticles] = useState<IArticle[]>(getArticleListType(articles, app));

    const [page, setPage] = useState(1);
    const [_canLoadMore, setCanLoadMore] = useState(canLoadMore);

    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        setArticles(getArticleListType(articles, app));
        setPage(1);
        setCanLoadMore(canLoadMore);
    }, [articles, canLoadMore, app]);

    const categoryId = typeof app.context?.searchParams?.filter === 'string' ? app.context.searchParams.filter : null;

    const loadMore = async (page: number) => {
        if (!isPending) {
            startTransition(async () => {
                const { articles, canLoadMore } = await fetchArticles(
                    { limit: page * countOnPage, categoryId: categoryId },
                    { locale: app.locale, preview: app.preview, webSetting: app.webSetting },
                );

                setPage(page);
                setArticles(articles);
                setCanLoadMore(canLoadMore);
            });
        }
    };

    const _categories = getArticleCategoryListType(categories);

    const blogHref = getPageUrl(app.webSetting?.articlesPage?.url || '', app.locale);

    return (
        <FadeIn className={styles.wrapper} spaceing={{ x: 'base', y: { top: 'large', bottom: 'large' } }}>
            <div className={styles.filters}>
                <a
                    href={blogHref}
                    className={clsx(styles.button, categoryId === null && styles.active)}
                    aria-label={'All articles'}
                >
                    {app.locale === 'cs' ? 'Vše' : 'All'}
                </a>
                {_categories.map((e) => (
                    <a
                        key={e.id}
                        href={blogHref + `?filter=${e.id}`}
                        className={clsx(styles.button, categoryId === e.id && styles.active)}
                        aria-label={`Filter by ${e.title}`}
                    >
                        {e.title}
                    </a>
                ))}
            </div>
            <div className={styles.list}>
                {_articles.map((e) => (
                    <a key={e.id} href={e.href} className={styles.article} aria-label={`Go to article ${e.title}`}>
                        <p className={styles.title}>{e.title}</p>
                        {e.category && <p className={styles.category}>{e.category?.title}</p>}
                    </a>
                ))}
            </div>
            {_canLoadMore && (
                <Button
                    loading={isPending}
                    onClick={() => !isPending && loadMore(page + 1)}
                    className={styles.loadMoreButton}
                    alt="Load more"
                >
                    {'Load more'}
                </Button>
            )}
        </FadeIn>
    );
};

export { ArticleList };
