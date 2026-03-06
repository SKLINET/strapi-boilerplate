import { ReactElement } from 'react';
import styles from './ArticleDetail.module.scss';
import { ArticleDetailBlockProps } from '../../../blocks/ArticleDetailBlock/ArticleDetailBlock';
import { DataPreview } from '../../base/DataPreview/DataPreview';
import { FadeIn } from '../../base/FadeIn/FadeIn';

const ArticleDetail = async ({
    blocksData,
    app,
    item,
}: Omit<ArticleDetailBlockProps, 'searchParams'>): Promise<ReactElement> => (
    <FadeIn className={styles.wrapper} spaceing={{ x: 'base', y: { top: 'large', bottom: 'large' } }}>
        <DataPreview title={item?.title || ''} data={item} />
    </FadeIn>
);

export { ArticleDetail };
