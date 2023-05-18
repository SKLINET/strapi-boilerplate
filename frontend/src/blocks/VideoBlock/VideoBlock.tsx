import React, { ReactElement } from 'react';
import config from '../../../sklinet.config.json';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { UploadedVideo } from '../../components/primitives/UploadedVideo/UploadedVideo';
import styles from './VideoBlock.module.scss';
import { AppContextProps, OmitRefType } from '@symbio/headless';
import { VideoBlock_content$data } from './__generated__/VideoBlock_content.graphql';
import { PageProps } from '../../types/page';
import { WebSettingsProps } from '../../types/webSettings';
import { ISystemResources } from '../../types/systemResources';
import { VideoProps } from '../../types/video';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VideoBlockStaticProps {}

export interface VideoBlockContent extends OmitRefType<VideoBlock_content$data> {
    __typename: 'ComponentBlockVideoBlock';
}

export interface VideoBlockProps extends VideoBlockStaticProps {
    blocksData: VideoBlockContent;
    app?: AppContextProps<PageProps, WebSettingsProps> & ISystemResources;
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

VideoBlock.whyDidYouRender = config.whyDidYouRender.active;

export default VideoBlock;
