import React, { ReactElement } from 'react';
import config from '../../../sklinet.config.json';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { NewsList } from '../../components/blocks/NewsList/NewsList';
import { BaseBlockProps, StaticBlockContext } from '../../types/block';
import { getPageUrl } from '../../utils/getPageUrl';
import { getSlug } from '@symbio/headless/utils';
import getPublicationState from '../../utils/getPublicationState';
import { AppContextProps, OmitRefType } from '@symbio/headless';
import { LatestArticlesBlock_content$data } from './__generated__/LatestArticlesBlock_content.graphql';
import { PageProps } from '../../types/page';
import { WebSettingsProps } from '../../types/webSettings';
import { ISystemResources } from '../../types/systemResources';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LatestArticlesBlockStaticProps {
    data: any;
}

export interface LatestArticlesBlockContent extends OmitRefType<LatestArticlesBlock_content$data> {
    __typename: 'ComponentBlockLatestArticlesBlock';
}

export interface LatestArticlesBlockProps extends LatestArticlesBlockStaticProps {
    blocksData: LatestArticlesBlockContent;
    app?: AppContextProps<PageProps, WebSettingsProps> & ISystemResources;
}

graphql`
    fragment LatestArticlesBlock_content on ComponentBlockLatestArticlesBlock {
        id
        buttonLabel
        heading
    }
`;

const LatestArticlesBlock = ({
    blocksData: { heading, buttonLabel },
    app,
    data,
}: LatestArticlesBlockProps): ReactElement => {
    const articlesData = data;
    const allNewsUrl = app?.webSetting?.data?.attributes?.articlesPage?.data?.attributes?.url || '';
    const detailUrl = app?.webSetting?.data?.attributes?.articleDetailPage?.data?.attributes?.url || '';

    return (
        <BlockWrapper>
            <NewsList
                headline={heading}
                items={articlesData}
                allNewsLinkText={buttonLabel || undefined}
                allNewsUrl={getPageUrl(allNewsUrl || '')}
                detailUrl={getPageUrl(detailUrl || '')}
            />
        </BlockWrapper>
    );
};

if (typeof window === 'undefined') {
    LatestArticlesBlock.getStaticProps = async ({
        locale,
        providers,
        context: { params, preview },
    }: StaticBlockContext): Promise<BaseBlockProps> => {
        const slug = getSlug(params.slug);
        const filter = { slug: { ne: slug } };
        const publicationState = getPublicationState(preview);
        return await providers.news.find({
            locale,
            limit: 3,
            offset: 0,
            filter,
            publicationState,
        });
    };
}

LatestArticlesBlock.whyDidYouRender = config.whyDidYouRender.active;

export default LatestArticlesBlock;
