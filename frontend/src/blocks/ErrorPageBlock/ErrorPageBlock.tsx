import React, { ReactElement } from 'react';
import config from '../../../sklinet.config.json';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { Error404 } from '../../components/blocks/Error404/Error404';
import { AppContextProps, OmitRefType } from '@symbio/headless';
import { ErrorPageBlock_content$data } from './__generated__/ErrorPageBlock_content.graphql';
import { PageProps } from '../../types/page';
import { WebSettingsProps } from '../../types/webSettings';
import { ISystemResources } from '../../types/systemResources';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ErrorPageBlockStaticProps {}

export interface ErrorPageBlockContent extends OmitRefType<ErrorPageBlock_content$data> {
    __typename: 'ComponentBlockErrorPageBlock';
}

export interface ErrorPageBlockProps extends ErrorPageBlockStaticProps {
    blocksData: ErrorPageBlockContent;
    app?: AppContextProps<PageProps, WebSettingsProps> & ISystemResources;
}

graphql`
    fragment ErrorPageBlock_content on ComponentBlockErrorPageBlock {
        description
        headline
    }
`;

const ErrorPageBlock = ({ blocksData, app }: ErrorPageBlockProps): ReactElement => {
    return (
        <BlockWrapper>
            <Error404 headline={blocksData?.headline || ''} description={blocksData?.description || ''} />
        </BlockWrapper>
    );
};

ErrorPageBlock.whyDidYouRender = config.whyDidYouRender.active;

export default ErrorPageBlock;
