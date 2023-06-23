import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import styles from './RichTextBlock.module.scss';
import { RichText } from '../../components/primitives/RichText/RichText';
import { OmitRefType } from '@symbio/headless';
import { RichTextBlock_content$data } from './__generated__/RichTextBlock_content.graphql';
import { IApp } from '../../types/app';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RichTextBlockStaticProps {}

export interface RichTextBlockContent extends OmitRefType<RichTextBlock_content$data> {
    __typename: 'ComponentBlockRichTextBlock';
}

export interface RichTextBlockProps extends RichTextBlockStaticProps {
    blocksData: RichTextBlockContent;
    app?: IApp;
    className?: string;
}

graphql`
    fragment RichTextBlock_content on ComponentBlockRichTextBlock {
        content
    }
`;

const RichTextBlock = ({ blocksData: { content }, app }: RichTextBlockProps): ReactElement => {
    return (
        <BlockWrapper className={`flex-col ${styles.wrapper}`}>
            {content && <RichText content={content} />}
        </BlockWrapper>
    );
};

RichTextBlock.whyDidYouRender = true;

export default RichTextBlock;
