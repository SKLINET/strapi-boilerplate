'use client';

import React, { JSX, ReactElement, useState } from 'react';
import styles from './Video.module.scss';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { IVideo } from '../../../../types/video';
import { Image } from '../../primitives/Image/Image';
import { Icon } from '../../primitives/Icon/Icon';
import { isYoutubeShortsUrl } from '../../../../utils/isYoutubeShortsUrl';

const UploadedVideo = dynamic(() =>
    import('../../primitives/UploadedVideo/UploadedVideo').then((mod) => mod.UploadedVideo),
);
const YoutubeVideo = dynamic(() =>
    import('../../primitives/YoutubeVideo/YoutubeVideo').then((mod) => mod.YoutubeVideo),
);
const VimeoVideo = dynamic(() => import('../../primitives/VimeoVideo/VimeoVideo').then((mod) => mod.VimeoVideo));
const FacebookVideo = dynamic(() =>
    import('../../primitives/FacebookVideo/FacebookVideo').then((mod) => mod.FacebookVideo),
);

interface VideoProps {
    data: IVideo;
    className?: string;
}

const Video = ({ data: { uploadedVideo, externalVideo, image }, className }: VideoProps): ReactElement => {
    const [play, setPlay] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const isShorts = externalVideo?.provider === 'youtube' && isYoutubeShortsUrl(externalVideo?.url);

    const renderVideo = (): JSX.Element => {
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
                            url={externalVideo.url}
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

    const renderImage = (): JSX.Element => {
        const imageClassNames = clsx(styles.image);

        if (image) {
            return (
                <Image
                    image={image}
                    alt={image.alternativeText}
                    fill
                    placeholder="blur"
                    sizes="(max-width: 48rem) 100vw, 80vw"
                    className={imageClassNames}
                />
            );
        }

        if (externalVideo && externalVideo.provider) {
            switch (externalVideo.provider) {
                case 'youtube': {
                    if (!externalVideo.providerUid) return <></>;
                    const url = `https://i3.ytimg.com/vi/${externalVideo.providerUid}/maxresdefault.jpg`;
                    return <Image src={url} alt="YouTube video image" fill className={imageClassNames} />;
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
        <div className={clsx(styles.wrapper, play && loaded && styles.showVideo, isShorts && styles.shorts, className)}>
            {play ? renderVideo() : <></>}
            <div className={styles.overlay}>
                <button
                    type="button"
                    onClick={() => setPlay(true)}
                    disabled={loaded}
                    className={styles.controlButton}
                    aria-label="Play video"
                >
                    <Icon name={icon} className={clsx(styles.icon, styles[icon])} />
                </button>
                {renderImage()}
            </div>
        </div>
    );
};

export { Video };
