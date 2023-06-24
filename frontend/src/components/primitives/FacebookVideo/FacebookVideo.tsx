import React from 'react';
import styles from './FacebookVideo.module.scss';
import clsx from 'clsx';

export interface FacebookVideoProps {
    url: string;
    className?: string;
    width?: number | null;
    height?: number | null;
}

const FacebookVideo = ({ url, className, width, height }: FacebookVideoProps): JSX.Element => (
    <div
        className={styles.wrapper}
        style={height && width ? { padding: `0 0 ${(height / width) * 100}% 0` } : undefined}
    >
        <iframe
            className={clsx(styles.iframe, className)}
            src={`https://www.facebook.com/plugins/video.php?href=${url}&show_text=false&t=0`}
            frameBorder="0"
            scrolling="no"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
    </div>
);

FacebookVideo.whyDidYouRender = true;

export { FacebookVideo };
