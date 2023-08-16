import React, { ReactElement, useRef } from 'react';
import styles from './LatestArticles.module.scss';
import clsx from 'clsx';
import { LatestArticlesBlockProps } from '../../../blocks/LatestArticlesBlock/LatestArticlesBlock';
import { useIsVisible } from '../../../utils/hooks/useIsVisible';
import { getArticleListType } from '../../../utils/strapi/getArticleType';
import { IApp } from '../../../types/app';

export type LatestArticlesProps = {
    blocksData: LatestArticlesBlockProps['blocksData'];
    app: LatestArticlesBlockProps['app'];
    data: LatestArticlesBlockProps['data'];
};

const LatestArticles = ({ blocksData, app, data }: LatestArticlesProps): ReactElement => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible] = useIsVisible(ref);

    const _articles = getArticleListType(data, app as IApp);

    return (
        <>
            <div className={clsx(styles.wrapper, isVisible && styles.isVisible)} ref={ref}>
                <h2 className="text-black text-4xl text-center mb-6">Latest articles block</h2>
                <pre className="bg-grey text-black p-8 overflow-x-auto">{JSON.stringify(_articles, null, 2)}</pre>
            </div>
        </>
    );
};

export { LatestArticles };
