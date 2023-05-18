import React, { DetailedHTMLProps, ReactElement, useEffect, useRef, VideoHTMLAttributes } from 'react';
import config from '../../../../sklinet.config.json';
import { VideoProps } from '../../../types/video';
import { getHLSVideo } from '@symbio/headless/utils';

export interface UploadedVideoI extends DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement> {
    video?: VideoProps;
    objectFit?: 'cover' | 'contain';
    objectPosition?: 'top' | 'bottom';
}

const UploadedVideo = ({ video, objectFit, objectPosition, autoPlay, ...rest }: UploadedVideoI): ReactElement => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (video && videoRef.current) {
            getHLSVideo(video?.url, videoRef.current);
        }
    }, [video, videoRef]);

    const classNames: string[] = ['w-full', 'h-full', 'outline-none'];
    if (objectFit) {
        classNames.push('object-' + objectFit);
        if (objectPosition) {
            classNames.push('object-' + objectPosition);
        }
    }

    return (
        <video
            id={`video-${video?.videoId || rest.id}`}
            ref={videoRef}
            className={classNames.join(' ')}
            poster={video?.thumbnailUrl ? video.thumbnailUrl + '?time=0' : undefined}
            autoPlay={autoPlay}
            muted={autoPlay}
            controls={!autoPlay}
            {...rest}
        >
            <source src={video?.url} type="application/vnd.apple.mpegURL" />
        </video>
    );
};

UploadedVideo.whyDidYouRender = config.whyDidYouRender.active;

export { UploadedVideo };
