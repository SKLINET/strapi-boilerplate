'use client';

import React, { ReactElement, useState } from 'react';
import styles from './Video.module.scss';
import clsx from 'clsx';
import { IVideo } from '../../../../types/video';
import { Image } from '../../primitives/Image/Image';
import { Icon } from '../../primitives/Icon/Icon';
import { getSystemResource } from '../../../../utils/strapi/getSystemResource';
import { IApp } from '../../../../types/base/app';
import { UploadedVideo } from '../../primitives/UploadedVideo/UploadedVideo';
import { YoutubeVideo } from '../../primitives/YoutubeVideo/YoutubeVideo';
import { VimeoVideo } from '../../primitives/VimeoVideo/VimeoVideo';
import { FacebookVideo } from '../../primitives/FacebookVideo/FacebookVideo';

interface VideoProps {
    data: IVideo;
    sizes?: string;
    app: IApp;
    className?: string;
}

const Video = ({ data: { uploadedVideo, externalVideo, image }, sizes, app, className }: VideoProps): ReactElement => {
    const [play, setPlay] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const renderVideo = (): ReactElement => {
        const videoClassNames = clsx(styles.video);

        if (uploadedVideo) {
            return <UploadedVideo video={uploadedVideo} loaded={() => setLoaded(true)} className={videoClassNames} />;
        }

        if (externalVideo && externalVideo.provider) {
            switch (externalVideo.provider) {
                case 'youtube': {
                    if (!externalVideo.providerUid) return <></>;
                    return (
                        <YoutubeVideo
                            uid={externalVideo.providerUid}
                            loaded={() => setLoaded(true)}
                            className={videoClassNames}
                        />
                    );
                }
                case 'vimeo': {
                    if (!externalVideo.providerUid) return <></>;

                    return (
                        <VimeoVideo
                            uid={externalVideo?.providerUid}
                            loaded={() => setLoaded(true)}
                            className={videoClassNames}
                        />
                    );
                }
                case 'facebook': {
                    if (!externalVideo.url) return <></>;

                    return (
                        <FacebookVideo
                            url={externalVideo.url}
                            loaded={() => setLoaded(true)}
                            width={externalVideo.width}
                            height={externalVideo.height}
                            className={videoClassNames}
                        />
                    );
                }
            }
        }

        return <></>;
    };

    const renderImage = (): ReactElement => {
        const imageClassNames = clsx(styles.image);

        if (image) {
            return (
                <Image
                    image={image}
                    alt={image.alternativeText}
                    fill
                    placeholder="blur"
                    sizes={sizes}
                    className={imageClassNames}
                />
            );
        }

        if (externalVideo && externalVideo.provider) {
            switch (externalVideo.provider) {
                case 'youtube': {
                    if (!externalVideo.providerUid) return <></>;
                    const url = `https://i3.ytimg.com/vi/${externalVideo.providerUid}/maxresdefault.jpg`;
                    return <Image src={url} alt="YouTube video image" unoptimized fill className={imageClassNames} />;
                }
                case 'vimeo': {
                    return <></>;
                }
                case 'facebook': {
                    return <></>;
                }
            }
        }

        return <></>;
    };

    const icon = play ? 'loader' : 'play';

    return (
        <div className={clsx(styles.wrapper, play && loaded && styles.showVideo, className)}>
            {play ? renderVideo() : <></>}
            <div className={styles.overlay}>
                <button
                    type="button"
                    onClick={() => setPlay(true)}
                    disabled={loaded}
                    className={styles.controlButton}
                    aria-label={getSystemResource('play_video', app?.systemResources)}
                >
                    <Icon name={icon} className={clsx(styles.icon, styles[icon])} />
                </button>
                {renderImage()}
            </div>
        </div>
    );
};

export { Video };
