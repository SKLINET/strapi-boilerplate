'use client';

import React, { JSX } from 'react';
import styles from './YoutubeVideo.module.scss';

export interface YoutubeVideoProps {
    uid: string;
    loaded: () => void;
    className?: string;
    width?: number;
    height?: number;
    url?: string;
}

const YoutubeVideo = ({ uid, loaded, className, width, height }: YoutubeVideoProps): JSX.Element => {
    return (
        <div className={className || styles.wrapper}>
            <iframe
                onLoad={() => loaded()}
                className={styles.iframe}
                width={width}
                height={height}
                src={`https://youtube.com/embed/${uid}?autoplay=1&mute=1`}
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; fullscreen; encrypted-media"
            />
        </div>
    );
};

export { YoutubeVideo };
