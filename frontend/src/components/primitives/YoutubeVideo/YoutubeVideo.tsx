import React from 'react';
import styles from './YoutubeVideo.module.scss';
import clsx from 'clsx';

export interface YoutubeVideoProps {
    uid: string;
    loaded: () => void;
    className?: string;
    width?: number;
    height?: number;
}

const YoutubeVideo = ({ uid, loaded, className, width, height }: YoutubeVideoProps): JSX.Element => (
    <div className={clsx(styles.wrapper, className)}>
        <iframe
            onLoad={() => loaded()}
            className={styles.iframe}
            width={width}
            height={height}
            src={`https://youtube.com/embed/${uid}?autoplay=1`}
            frameBorder="0"
            allowFullScreen
            allow="autoplay; fullscreen"
        />
    </div>
);

export { YoutubeVideo };
