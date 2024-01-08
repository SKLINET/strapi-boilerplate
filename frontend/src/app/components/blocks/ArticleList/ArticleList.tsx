import React, { ReactElement } from 'react';
import styles from './ArticleList.module.scss';
import { ArticlesListBlockProps } from '../../../blocks/ArticlesListBlock/ArticlesListBlock';
import { getArticleListType } from '../../../../utils/strapi/getArticleType';

const ArticleList = ({ blocksData, app, data }: ArticlesListBlockProps): ReactElement => {
    const articles = getArticleListType(data?.articles, app);
    return (
        <section className={styles.wrapper}>
            <h2>Article list block</h2>
            <pre>{JSON.stringify(articles, null, 2)}</pre>
        </section>
    );
};

export { ArticleList };
