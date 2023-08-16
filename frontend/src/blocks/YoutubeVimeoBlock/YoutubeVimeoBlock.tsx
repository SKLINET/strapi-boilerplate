import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { Video } from '../../components/organisms/Video/Video';
import { OmitRefType } from '@symbio/headless';
import { YoutubeVimeoBlock_content$data } from './__generated__/YoutubeVimeoBlock_content.graphql';
import { VideoProps } from '../../types/video';
import { IApp } from '../../types/app';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface YoutubeVimeoBlockStaticProps {}

export interface YoutubeVimeoBlockContent extends OmitRefType<YoutubeVimeoBlock_content$data> {
    __typename: 'ComponentBlockYoutubeVimeoBlock';
}

export interface YoutubeVimeoBlockProps extends YoutubeVimeoBlockStaticProps {
    blocksData: Omit<YoutubeVimeoBlockContent, ' $fragmentType'>;
    app?: IApp;
    className?: string;
}

graphql`
    fragment YoutubeVimeoBlock_content on ComponentBlockYoutubeVimeoBlock {
        url
        provider
        providerUid
        width
        height
        title
        thumbnailUrl
    }
`;

const YoutubeVimeoBlock = ({ blocksData, app }: YoutubeVimeoBlockProps): ReactElement => {
    return (
        <BlockWrapper>
            <Video video={{ ...(blocksData as VideoProps) }} />
        </BlockWrapper>
    );
};

YoutubeVimeoBlock.whyDidYouRender = true;

export default YoutubeVimeoBlock;
