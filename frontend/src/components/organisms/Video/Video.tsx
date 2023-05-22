import React from 'react';
import config from '../../../../sklinet.config.json';
import { VideoProps } from '../../../types/video';
import { FacebookVideo } from '../../primitives/FacebookVideo/FacebookVideo';
import { UploadedVideo } from '../../primitives/UploadedVideo/UploadedVideo';
import { VimeoVideo } from '../../primitives/VimeoVideo/VimeoVideo';
import { YoutubeVideo } from '../../primitives/YoutubeVideo/YoutubeVideo';

export interface VideoComponentProps {
    video: VideoProps;
    autoPlay?: boolean | null;
    objectFit?: 'cover' | 'contain' | undefined;
    loop?: boolean;
    className?: string;
}

const Video = ({ video, autoPlay, objectFit, loop, className }: VideoComponentProps): JSX.Element => {
    if (video.data?.attributes?.url) {
        return (
            <UploadedVideo
                video={video}
                autoPlay={Boolean(autoPlay)}
                objectFit={objectFit}
                loop={loop}
                className={className}
            />
        );
    }

    if (video?.provider) {
        switch (video?.provider) {
            case 'youtube':
                return video.providerUid ? <YoutubeVideo uid={video?.providerUid} className={className} /> : <></>;
            case 'vimeo':
                return video.providerUid ? <VimeoVideo uid={video?.providerUid} className={className} /> : <></>;
            case 'facebook':
                return video.url ? (
                    <FacebookVideo url={video?.url} className={className} width={video?.width} height={video?.height} />
                ) : (
                    <></>
                );
        }
    }

    return <></>;
};

Video.whyDidYouRender = config.whyDidYouRender.active;

export { Video };
