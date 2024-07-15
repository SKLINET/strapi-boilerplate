import React, { ReactElement } from 'react';
import styles from './ArticleDetail.module.scss';
import { ArticleDetailBlockProps } from '../../../blocks/ArticleDetailBlock/ArticleDetailBlock';
import { DataPreview } from '../../base/DataPreview/DataPreview';

const ArticleDetail = ({ blocksData, app, item }: ArticleDetailBlockProps): ReactElement => {
    return (
        <section className={styles.wrapper}>
            <DataPreview title={item?.attributes?.title || ''} data={item} />;
        </section>
    );
};

export { ArticleDetail };
