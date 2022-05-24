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
        videoId
        thumbnailUrl
    }
`;

function VideoBlock({ blocksData, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    const { autoplay, video } = blocksData;
    return (
        <BlockWrapper className={styles.wrapper} {...rest}>
            <Video video={video} autoPlay={autoplay} />
        </BlockWrapper>
    );
}

VideoBlock.whyDidYouRender = true;

export default VideoBlock;
