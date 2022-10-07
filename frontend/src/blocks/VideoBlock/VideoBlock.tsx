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
    const getVideoProvider = (url: string) => {
        if (url.includes('facebook')) {
            return 'facebook';
        }
        if (url.includes('vimeo')) {
            return 'vimeo';
        }
        if (url.includes('youtube')) {
            return 'youtube';
        }
    };

    return (
        <BlockWrapper className={styles.wrapper} {...rest}>
            <Video
                video={video}
                externalVideo={{ url: externalVideo, provider: getVideoProvider(externalVideo || '') || '' }}
                autoPlay={autoplay}
            />
        </BlockWrapper>
    );
}

VideoBlock.whyDidYouRender = true;

export default VideoBlock;
