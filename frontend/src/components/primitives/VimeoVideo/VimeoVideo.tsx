import React from 'react';
import styles from './VimeoVideo.module.scss';
import clsx from 'clsx';

export interface VimeoVideoProps {
    uid: string;
    loaded: () => void;
    className?: string;
    width?: number;
    height?: number;
}

const VimeoVideo = ({ uid, loaded, className, width, height }: VimeoVideoProps) => (
    <div className={clsx(styles.wrapper, className)}>
        <iframe
            onLoad={() => loaded()}
            src={`https://player.vimeo.com/video/${uid}?autoplay=1`}
            className={styles.iframe}
            width={width}
            height={height}
            frameBorder="0"
            allowFullScreen
            allow="autoplay; fullscreen"
        />
    </div>
);

export { VimeoVideo };
