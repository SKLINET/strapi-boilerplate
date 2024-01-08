'use client';

import React, { ReactElement, useState, useEffect, useTransition } from 'react';
import styles from './ArticleList.module.scss';
import clsx from 'clsx';
import { ArticlesListBlockProps } from '../../../blocks/ArticlesListBlock/ArticlesListBlock';
import { getArticleListType } from '../../../../utils/strapi/getArticleType';
import { IArticle } from '../../../../types/article';
import { getItemId } from '../../../../utils/getItemId';
import { fetchArticles } from '../../../actions/fetch-articles';
import { getArticleCategoryListType } from '../../../../utils/strapi/getArticleCategoryType';
import { getPageUrl } from '../../../../utils/getPageUrl';

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

    const categoryId =
        typeof app.context?.searchParams?.filter === 'string' ? getItemId(app.context.searchParams.filter) : null;

    const loadMore = async (page: number) => {
        if (!isPending) {
            startTransition(async () => {
                const { articles, canLoadMore } = await fetchArticles(page * countOnPage, app, {
                    categoryId: categoryId,
                });

                setPage(page);
                setArticles(articles);
                setCanLoadMore(canLoadMore);
            });
        }
    };

    const _categories = getArticleCategoryListType(categories);

    const blogHref = getPageUrl(
        app.webSetting?.data?.attributes?.articlesPage?.data?.attributes?.url || '',
        app.locale,
    );

    return (
        <section className={styles.wrapper}>
            <div className={styles.filters}>
                <a href={blogHref} className={clsx(styles.button, categoryId === null && styles.active)}>
                    {app.locale === 'cs' ? 'Vše' : 'All'}
                </a>
                {_categories.map((e) => (
                    <a
                        key={e.id}
                        href={blogHref + `?filter=${getItemId(e.id)}`}
                        className={clsx(styles.button, categoryId === getItemId(e.id) && styles.active)}
                    >
                        {e.title}
                    </a>
                ))}
            </div>
            <div className={styles.list}>
                {_articles.map((e) => (
                    <a key={e.id} href={e.href} className={styles.article}>
                        <p className={styles.title}>{e.title}</p>
                        {e.category && <p className={styles.category}>{e.category?.title}</p>}
                    </a>
                ))}
            </div>
        </section>
    );
};

export { ArticleList };
