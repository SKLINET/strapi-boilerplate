import React, { ReactElement } from 'react';
import styles from './ArticleDetail.module.scss';
import { ArticleDetailBlockProps } from '../../../blocks/ArticleDetailBlock/ArticleDetailBlock';

const ArticleDetail = ({ blocksData, app, item }: ArticleDetailBlockProps): ReactElement => {
    return (
        <section className={styles.wrapper}>
            <h2>Article detail block</h2>
            <pre>{JSON.stringify(item, null, 2)}</pre>
        </section>
    );
};

export { ArticleDetail };
