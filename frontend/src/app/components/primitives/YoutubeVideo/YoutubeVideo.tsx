'use client';

import { ReactElement } from 'react';
import styles from './YoutubeVideo.module.scss';
import clsx from 'clsx';

export interface YoutubeVideoProps {
    uid: string;
    loaded: () => void;
    className?: string;
    width?: number;
    height?: number;
}

const YoutubeVideo = ({ uid, loaded, className, width, height }: YoutubeVideoProps): ReactElement => (
    <div className={clsx(styles.wrapper, className)}>
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

export { YoutubeVideo };
