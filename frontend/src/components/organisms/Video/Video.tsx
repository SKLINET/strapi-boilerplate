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
    };
}

const getVideoUid = (provider: string, url: string) => {
    if (provider === 'youtube') {
        // eslint-disable-next-line no-useless-escape
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\/)|(\?v=|\&v=))([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[8].length == 11) {
            return match[8];
        }
    }
    if (provider === 'vimeo') {
        const regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
        const match = url.match(regExp);
        if (match && match[5]) {
            return match[5];
        }
    }
};

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
                return externalVideo?.url ? (
                    <YoutubeVideo
                        uid={getVideoUid(externalVideo?.provider, externalVideo?.url) || ''}
                        className={className}
                    />
                ) : (
                    <></>
                );
            case 'vimeo':
                return externalVideo?.url ? (
                    <VimeoVideo
                        uid={getVideoUid(externalVideo?.provider, externalVideo?.url) || ''}
                        className={className}
                    />
                ) : (
                    <></>
                );
            case 'facebook':
                return externalVideo.url ? <FacebookVideo url={externalVideo?.url} className={className} /> : <></>;
        }
    }

    return <></>;
};

Video.whyDidYouRender = true;

export { Video };
