import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import styles from './ArticlesListBlock.module.scss';
import { BaseBlockProps } from '../../types/block';
import { StaticBlockContext } from '@symbio/headless';
import { WebSettingsProps } from '../../types/webSettings';
import { Providers } from '../../types/providers';
import { Locale } from '../../types/locale';
import { NewsList } from '../../components/blocks/NewsList/NewsList';
import getPublicationState from '../../utils/getPublicationState';

graphql`
    fragment ArticlesListBlock_content on ComponentBlockArticlesListBlock {
        id
        sectionId
    }
`;

function ArticlesListBlock({ blocksData, data, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    const articles = data || [];
    const detailUrl = rest?.app?.webSetting?.data?.attributes?.articleDetailPage?.data?.attributes?.url || '';
    return (
        <BlockWrapper className={styles.wrapper} {...rest}>
            <NewsList items={articles} detailUrl={detailUrl} />
        </BlockWrapper>
    );
}

if (typeof window === 'undefined') {
    ArticlesListBlock.getStaticProps = async ({
        locale,
        providers,
        context: { params, preview },
    }: StaticBlockContext<any, WebSettingsProps, Providers, Locale>): Promise<any> => {
        const publicationState = getPublicationState(preview);
        const data = await providers.news.find({
            locale,
            slug: params?.slug,
            publicationState: publicationState,
        });
        return data;
    };
}

ArticlesListBlock.whyDidYouRender = true;

export default ArticlesListBlock;
