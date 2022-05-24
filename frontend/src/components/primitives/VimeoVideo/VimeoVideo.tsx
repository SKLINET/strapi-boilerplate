import React from 'react';
import clsx from 'clsx';
import styles from './VimeoVideo.module.scss';

export interface VimeoVideoProps {
    uid: string;
    className?: string;
    width?: number;
    height?: number;
}

const VimeoVideo = ({ uid, className, width, height }: VimeoVideoProps) => (
    <div className={styles.wrapper}>
        <iframe
            src={`https://player.vimeo.com/video/${uid}`}
            className={clsx(styles.iframe, className)}
            width={width}
            height={height}
            frameBorder={0}
            allowFullScreen
        />
    </div>
);

VimeoVideo.whyDidYouRender = true;

export { VimeoVideo };
