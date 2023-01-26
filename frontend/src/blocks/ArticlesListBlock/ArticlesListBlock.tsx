import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import styles from './ArticlesListBlock.module.scss';
import { StaticBlockContext } from '@symbio/headless';
import { Providers } from '../../types/providers';
import { Locale } from '../../types/locale';
import { NewsList } from '../../components/blocks/NewsList/NewsList';
import getPublicationState from '../../utils/getPublicationState';
import { AppContextProps, OmitRefType } from '@symbio/headless';
import { ArticlesListBlock_content } from './__generated__/ArticlesListBlock_content.graphql';
import { PageProps } from '../../types/page';
import { WebSettingsProps } from '../../types/webSettings';
import { ISystemResources } from '../../types/systemResources';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ArticlesListBlockStaticProps {
    data: any[];
    count: number;
}

export interface ArticlesListBlockContent extends OmitRefType<ArticlesListBlock_content> {
    __typename: 'ComponentBlockArticlesListBlock';
}

export interface ArticlesListBlockProps extends ArticlesListBlockStaticProps {
    blocksData: ArticlesListBlockContent;
    app?: AppContextProps<PageProps, WebSettingsProps> & ISystemResources;
}

graphql`
    fragment ArticlesListBlock_content on ComponentBlockArticlesListBlock {
        id
        sectionId
    }
`;

const ArticlesListBlock = ({ blocksData, app, data, count }: ArticlesListBlockProps): ReactElement => {
    const articles = data || [];
    const detailUrl = app?.webSetting?.data?.attributes?.articleDetailPage?.data?.attributes?.url || '';
    return (
        <BlockWrapper className={styles.wrapper}>
            <NewsList items={articles} detailUrl={detailUrl} />
        </BlockWrapper>
    );
};

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
