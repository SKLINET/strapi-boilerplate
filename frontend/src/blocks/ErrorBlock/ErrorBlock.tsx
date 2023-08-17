import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { OmitRefType } from '@symbio/headless';
import { ErrorBlock_content$data } from './__generated__/ErrorBlock_content.graphql';
import { IApp } from '../../types/app';
import { Error } from '../../components/blocks/Error/Error';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ErrorBlockStaticProps {}

export interface ErrorBlockContent extends OmitRefType<ErrorBlock_content$data> {
    __typename: 'ComponentBlockErrorBlock';
}

export interface ErrorBlockProps extends ErrorBlockStaticProps {
    blocksData: ErrorBlockContent;
    app?: IApp;
    className?: string;
}

graphql`
    fragment ErrorBlock_content on ComponentBlockErrorBlock {
        title
        description
    }
`;

const ErrorBlock = ({ blocksData, app }: ErrorBlockProps): ReactElement => <Error blocksData={blocksData} app={app} />;

ErrorBlock.whyDidYouRender = true;

export default ErrorBlock;
