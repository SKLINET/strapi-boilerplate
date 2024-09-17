'use client';

import React, { ReactElement, useEffect, useRef } from 'react';
import styles from './UploadedVideo.module.scss';
import clsx from 'clsx';
import { IUploadedVideo } from '../../../../types/video';

interface UploadedVideoProps {
    video: IUploadedVideo;
    loaded: () => void;
    className?: string;
}

const UploadedVideo = ({ video: { url, type }, loaded, className }: UploadedVideoProps): ReactElement => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const onLoadedMetadata = () => {
            if (!videoRef || !videoRef.current) return;

            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            videoRef.current.play();

            loaded();
        };

        videoRef.current?.addEventListener('loadedmetadata', onLoadedMetadata, { passive: true });

        // eslint-disable-next-line react-hooks/exhaustive-deps
        return () => videoRef.current?.removeEventListener('loadedmetadata', onLoadedMetadata);
    }, [videoRef, loaded]);

    return (
        <video
            ref={videoRef}
            autoPlay={false}
            muted={false}
            controls={true}
            className={clsx(styles.wrapper, className)}
        >
            <source src={url} type={type} />
        </video>
    );
};

export { UploadedVideo };
