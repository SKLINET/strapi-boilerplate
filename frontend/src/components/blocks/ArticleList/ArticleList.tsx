import React, { ReactElement, useRef } from 'react';
import styles from './ArticleList.module.scss';
import clsx from 'clsx';
import { ArticlesListBlockProps } from '../../../blocks/ArticlesListBlock/ArticlesListBlock';
import { useIsVisible } from '../../../utils/hooks/useIsVisible';
import { getArticleListType } from '../../../utils/strapi/getArticleType';
import { IApp } from '../../../types/app';

export type ArticleListProps = {
    blocksData: ArticlesListBlockProps['blocksData'];
    app: ArticlesListBlockProps['app'];
    data: ArticlesListBlockProps['data'];
};

const ArticleList = ({ blocksData, app, data }: ArticleListProps): ReactElement => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible] = useIsVisible(ref);

    const _articles = getArticleListType(data, app as IApp);

    return (
        <>
            <div className={clsx(styles.wrapper, isVisible && styles.isVisible)} ref={ref}>
                <h2 className="text-black text-4xl text-center mb-6">Article list block</h2>
                <pre className="bg-grey text-black p-8 overflow-x-auto">{JSON.stringify(_articles, null, 2)}</pre>
            </div>
        </>
    );
};

export { ArticleList };
