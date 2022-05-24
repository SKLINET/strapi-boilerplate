import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import styles from './RichTextBlock.module.scss';
import { RichText } from '../../components/primitives/RichText/RichText';
import { BaseBlockProps } from '../../types/block';

graphql`
    fragment RichTextBlock_content on ComponentBlockRichTextBlock {
        content
    }
`;

function RichTextBlock({ blocksData, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    return (
        <BlockWrapper className={`flex-col ${styles.wrapper}`} {...rest}>
            <RichText content={blocksData?.content} />
        </BlockWrapper>
    );
}

RichTextBlock.whyDidYouRender = true;

export default RichTextBlock;
