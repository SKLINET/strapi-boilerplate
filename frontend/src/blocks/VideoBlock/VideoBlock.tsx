import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { UploadedVideo } from '../../components/primitives/UploadedVideo/UploadedVideo';
import styles from './VideoBlock.module.scss';
import { OmitRefType } from '@symbio/headless';
import { VideoBlock_content$data } from './__generated__/VideoBlock_content.graphql';
import { VideoProps } from '../../types/video';
import { IApp } from '../../types/app';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VideoBlockStaticProps {}

export interface VideoBlockContent extends OmitRefType<VideoBlock_content$data> {
    __typename: 'ComponentBlockVideoBlock';
}

export interface VideoBlockProps extends VideoBlockStaticProps {
    blocksData: Omit<VideoBlockContent, ' $fragmentType'>;
    app?: IApp;
    className?: string;
}

graphql`
    fragment VideoBlock_content on ComponentBlockVideoBlock {
        autoplay
        video {
            ...appVideoFragment @relay(mask: false)
        }
        videoId
        thumbnailUrl
    }
`;

const VideoBlock = ({ blocksData: { video, autoplay, thumbnailUrl, videoId }, app }: VideoBlockProps): ReactElement => {
    return (
        <BlockWrapper className={styles.wrapper}>
            {video && <UploadedVideo video={video as VideoProps} autoPlay={autoplay || false} />}
        </BlockWrapper>
    );
};

VideoBlock.whyDidYouRender = true;

export default VideoBlock;
