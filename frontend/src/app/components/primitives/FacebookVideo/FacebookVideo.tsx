'use client';

import { ReactElement } from 'react';
import styles from './FacebookVideo.module.scss';
import clsx from 'clsx';

export interface FacebookVideoProps {
    url: string;
    loaded: () => void;
    className?: string;
    width?: number;
    height?: number;
}

const FacebookVideo = ({ url, loaded, className, width, height }: FacebookVideoProps): ReactElement => (
    <div className={clsx(styles.wrapper, className)}>
        <iframe
            onLoad={() => loaded()}
            className={styles.iframe}
            width={width}
            height={height}
            src={`https://www.facebook.com/plugins/video.php?href=${url}&autoplay=1`}
            frameBorder="0"
            scrolling="no"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share fullscreen;"
        />
    </div>
);

export { FacebookVideo };
