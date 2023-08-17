import React, { ReactElement, useState, useRef, useEffect } from 'react';
import styles from './Video.module.scss';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { VideoBlockProps } from '../../../blocks/VideoBlock/VideoBlock';
import { useIsVisible } from '../../../utils/hooks/useIsVisible';
import { getVideoType } from '../../../utils/strapi/getVideoType';
import { getImageType } from '../../../utils/strapi/getImageType';
import { Image } from '../../primitives/Image/Image';
import { Icon } from '../../primitives/Icon/Icon';

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

export type VideoProps = {
    blocksData: VideoBlockProps['blocksData'];
    app: VideoBlockProps['app'];
};

const Video = ({
    blocksData: {
        video: { uploadedVideo, externalVideo, optionalImage },
    },
    app,
}: VideoProps): ReactElement => {
    const ref = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLDivElement>(null);

    const [isVisible] = useIsVisible(ref);

    const [play, setPlay] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const updateHeight = () => {
            if (!videoRef || !videoRef.current) return;

            const { clientWidth } = videoRef.current;

            videoRef.current.style.height = `${clientWidth * (9 / 16)}px`;
        };

        updateHeight();
        window.addEventListener('resize', () => updateHeight(), { passive: true });

        return () => window.removeEventListener('resize', () => updateHeight());
    }, [videoRef]);

    const renderVideo = (): JSX.Element => {
        const videoClassNames = clsx(styles.video);

        const _uploadedVideo = getVideoType(uploadedVideo);

        if (_uploadedVideo) {
            return <UploadedVideo video={_uploadedVideo} loaded={() => setLoaded(true)} className={videoClassNames} />;
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

    const _image = getImageType(optionalImage);

    return (
        <div className={clsx(styles.wrapper, isVisible && styles.isVisible)} ref={ref}>
            <div className={clsx(styles.videoWrapper, loaded && styles.loaded)} ref={videoRef}>
                {play ? renderVideo() : <></>}
                <div className={styles.videoOverlay}>
                    {_image && <Image image={_image} alt="Image" fill className={styles.image} />}
                    <button type="button" onClick={() => setPlay(true)} className={styles.playButton}>
                        <Icon
                            name={play ? 'loader' : 'play'}
                            className={clsx(styles.icon, play ? styles.isLoader : styles.isPlay)}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export { Video };
