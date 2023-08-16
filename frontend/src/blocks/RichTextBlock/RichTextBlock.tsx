import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { OmitRefType } from '@symbio/headless';
import { RichTextBlock_content$data } from './__generated__/RichTextBlock_content.graphql';
import { IApp } from '../../types/app';
import { RichText } from '../../components/blocks/RichText/RichText';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RichTextBlockStaticProps {}

export interface RichTextBlockContent extends OmitRefType<RichTextBlock_content$data> {
    __typename: 'ComponentBlockRichTextBlock';
}

export interface RichTextBlockProps extends RichTextBlockStaticProps {
    blocksData: Omit<RichTextBlockContent, ' $fragmentType'>;
    app?: IApp;
    className?: string;
}

graphql`
    fragment RichTextBlock_content on ComponentBlockRichTextBlock {
        id
        content
    }
`;

const RichTextBlock = ({ blocksData, app }: RichTextBlockProps): ReactElement => (
    <RichText blocksData={blocksData} app={app} />
);

RichTextBlock.whyDidYouRender = true;

export default RichTextBlock;
