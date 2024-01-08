import React, { ReactElement } from 'react';
import styles from './ArticleDetail.module.scss';
import { ArticleDetailBlockProps } from '../../../blocks/ArticleDetailBlock/ArticleDetailBlock';
import { Breadcrumbs } from '../../molecules/Breadcrumbs/Breadcrumbs';

const ArticleDetail = ({ blocksData, app, item }: ArticleDetailBlockProps): ReactElement => {
    return (
        <section className={styles.wrapper}>
            <h2>{item.attributes?.title || ''}</h2>
            <Breadcrumbs app={app} />
            <pre>{JSON.stringify(item, null, 2)}</pre>
        </section>
    );
};

export { ArticleDetail };
