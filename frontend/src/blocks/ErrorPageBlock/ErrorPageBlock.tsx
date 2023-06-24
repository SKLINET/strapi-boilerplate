import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { Error404 } from '../../components/blocks/Error404/Error404';
import { OmitRefType } from '@symbio/headless';
import { ErrorPageBlock_content$data } from './__generated__/ErrorPageBlock_content.graphql';
import { IApp } from '../../types/app';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ErrorPageBlockStaticProps {}

export interface ErrorPageBlockContent extends OmitRefType<ErrorPageBlock_content$data> {
    __typename: 'ComponentBlockErrorPageBlock';
}

export interface ErrorPageBlockProps extends ErrorPageBlockStaticProps {
    blocksData: ErrorPageBlockContent;
    app?: IApp;
    className?: string;
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

ErrorPageBlock.whyDidYouRender = true;

export default ErrorPageBlock;
