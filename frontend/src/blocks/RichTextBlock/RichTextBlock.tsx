import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import styles from './RichTextBlock.module.scss';
import { RichText } from '../../components/primitives/RichText/RichText';
import { AppContextProps, OmitRefType } from '@symbio/headless';
import { RichTextBlock_content } from './__generated__/RichTextBlock_content.graphql';
import { PageProps } from '../../types/page';
import { WebSettingsProps } from '../../types/webSettings';
import { ISystemResources } from '../../types/systemResources';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RichTextBlockStaticProps {}

export interface RichTextBlockContent extends OmitRefType<RichTextBlock_content> {
    __typename: 'ComponentBlockRichTextBlock';
}

export interface RichTextBlockProps extends RichTextBlockStaticProps {
    blocksData: RichTextBlockContent;
    app?: AppContextProps<PageProps, WebSettingsProps> & ISystemResources;
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
