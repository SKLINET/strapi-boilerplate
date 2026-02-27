'use client';

import { ReactElement, useState, useEffect, useTransition } from 'react';
import styles from './ArticleList.module.scss';
import clsx from 'clsx';
import { ArticlesListBlockProps } from '../../../blocks/ArticlesListBlock/ArticlesListBlock';
import { IArticle } from '../../../../types/article';
import { fetchArticles } from '../../../actions/fetch-articles';
import { getPageUrl } from '../../../../utils/getPageUrl';
import { Button } from '../../primitives/Button/Button';
import { FadeIn } from '../../base/FadeIn/FadeIn';
import { getSystemResource } from '../../../../utils/strapi/getSystemResource';

const ArticleList = ({
    blocksData: { countOnPage, anchor },
    app,
    data: { articles, categories, canLoadMore },
}: ArticlesListBlockProps): ReactElement => {
    const [_articles, setArticles] = useState<IArticle[]>(articles);

    const [page, setPage] = useState(1);
    const [_canLoadMore, setCanLoadMore] = useState(canLoadMore);

    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        setArticles(articles);
        setPage(1);
        setCanLoadMore(canLoadMore);
    }, [articles, canLoadMore, app]);

    // const categoryId = typeof app.context?.searchParams?.filter === 'string' ? app.context.searchParams.filter : null;
    const categoryId = null;

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

    const blogHref = getPageUrl(app.webSetting?.articlesPage?.url || '', app.locale);

    return (
        <FadeIn
            className={styles.wrapper}
            spaceing={{ x: 'base', y: { top: 'large', bottom: 'large' } }}
            anchor={anchor}
        >
            <div className={styles.filters}>
                <a
                    href={blogHref}
                    className={clsx(styles.button, categoryId === null && styles.active)}
                    aria-label={getSystemResource('all', app?.systemResources)}
                >
                    {getSystemResource('all', app?.systemResources)}
                </a>
                {categories.map((e) => (
                    <a
                        key={e.id}
                        href={blogHref + `?filter=${e.id}`}
                        className={clsx(styles.button, categoryId === e.id && styles.active)}
                        aria-label={getSystemResource('filter_by_value', app?.systemResources).replace(
                            '{value}',
                            e.title,
                        )}
                    >
                        {e.title}
                    </a>
                ))}
            </div>
            <div className={styles.list}>
                {_articles.map((e) => (
                    <a
                        key={e.id}
                        href={e.href}
                        className={styles.article}
                        aria-label={getSystemResource('go_to_value', app?.systemResources).replace('{value}', e.title)}
                    >
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
                >
                    {getSystemResource('load_more', app?.systemResources)}
                </Button>
            )}
        </FadeIn>
    );
};

export { ArticleList };
