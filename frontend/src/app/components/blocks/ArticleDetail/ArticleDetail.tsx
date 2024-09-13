import React, { ReactElement } from 'react';
import styles from './ArticleDetail.module.scss';
import { ArticleDetailBlockProps } from '../../../blocks/ArticleDetailBlock/ArticleDetailBlock';
import { DataPreview } from '../../base/DataPreview/DataPreview';
import { FadeIn } from '../../base/FadeIn/FadeIn';

const ArticleDetail = ({ blocksData, app, item }: ArticleDetailBlockProps): ReactElement => {
    return (
        <FadeIn className={styles.wrapper}>
            <DataPreview title={item?.attributes?.title || ''} data={item} />;
        </FadeIn>
    );
};

export { ArticleDetail };
