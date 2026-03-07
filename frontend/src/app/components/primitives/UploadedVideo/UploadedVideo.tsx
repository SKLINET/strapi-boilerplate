'use client';

import { ReactElement, useEffect, useRef } from 'react';
import styles from './UploadedVideo.module.scss';
import clsx from 'clsx';
import { IUploadedVideo } from '../../../../types/video';
import { useVideoFade } from '../../../../utils/hooks/useVideoFade';
import { useVideoResize } from '../../../../utils/cloudinary/useVideoResize';

interface UploadedVideoProps {
    video: IUploadedVideo;
    loaded?: () => void;
    autoPlay?: boolean;
    controls?: boolean;
    muted?: boolean;
    loop?: boolean;
    withTransition?: boolean;
    className?: string;
}

const UploadedVideo = ({
    video: { url, type },
    loaded,
    autoPlay = false,
    controls = true,
    muted = false,
    loop = false,
    withTransition = false,
    className,
}: UploadedVideoProps): ReactElement => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const { show, update } = useVideoFade(withTransition, loop);

    const resizedUrl = useVideoResize(url);

    useEffect(() => {
        const onLoadedMetadata = () => {
            if (!videoRef || !videoRef.current) return;

            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            videoRef.current.play();

            loaded && loaded();
        };

        videoRef.current?.addEventListener('loadedmetadata', onLoadedMetadata, { passive: true });

        return () => videoRef.current?.removeEventListener('loadedmetadata', onLoadedMetadata);
    }, [videoRef, loaded, resizedUrl]);

    if (!resizedUrl) return <></>;

    return (
        <video
            ref={videoRef}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            controls={controls}
            playsInline
            onLoad={() => videoRef.current?.play()}
            onTimeUpdate={() => videoRef?.current && update(videoRef.current.currentTime, videoRef.current.duration)}
            className={clsx(
                styles.wrapper,
                withTransition && styles.withTransition,
                withTransition && show && styles.showVideo,
                className,
            )}
        >
            <source src={resizedUrl} type={type} />
        </video>
    );
};

export { UploadedVideo };
