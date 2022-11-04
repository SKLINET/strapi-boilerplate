import React from 'react';
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
    externalVideo?: {
        url: string;
        provider: string;
        uid: string;
    };
}

const Video = ({ video, autoPlay, objectFit, loop, className, externalVideo }: VideoComponentProps): JSX.Element => {
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

    if (!video.data && externalVideo?.url) {
        switch (externalVideo?.provider) {
            case 'youtube':
                return externalVideo?.uid ? (
                    <YoutubeVideo uid={externalVideo.uid || ''} className={className} />
                ) : (
                    <></>
                );
            case 'vimeo':
                return externalVideo?.uid ? <VimeoVideo uid={externalVideo.uid || ''} className={className} /> : <></>;
            case 'facebook':
                return externalVideo.url ? <FacebookVideo url={externalVideo?.url} className={className} /> : <></>;
        }
    }

    return <></>;
};

Video.whyDidYouRender = true;

export { Video };
