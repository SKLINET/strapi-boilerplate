import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { Video } from '../../components/organisms/Video/Video';
import styles from './VideoBlock.module.scss';
import { BaseBlockProps } from '../../types/block';

graphql`
    fragment VideoBlock_content on ComponentBlockVideoBlock {
        autoplay
        video {
            data {
                attributes {
                    url
                    width
                    height
                    alternativeText
                }
            }
        }
        externalVideo
    }
`;

function VideoBlock({ blocksData, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    const { autoplay, video, externalVideo } = blocksData;

    return (
        <BlockWrapper className={styles.wrapper} {...rest}>
            <Video
                video={video}
                externalVideo={{
                    url: externalVideo.url,
                    provider: externalVideo.provider,
                    uid: externalVideo.videoUid,
                }}
                autoPlay={autoplay}
            />
        </BlockWrapper>
    );
}

VideoBlock.whyDidYouRender = true;

export default VideoBlock;
