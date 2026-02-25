import { useState, useEffect } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fit } from '@cloudinary/url-gen/actions/resize';
import { DESKTOP_BREAKPOINT, TABLET_BREAKPOINT } from '../../constants';
import { getCloudinaryMediaId } from '../../utils/getCloudinaryMediaId';
import { transformCloudinaryUrl } from './cloudinaryUrl';

export const useVideoResize = (url: string) => {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    const myCld = new Cloudinary({
        cloud: {
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
        },
    });

    useEffect(() => {
        const updateVideoUrl = () => {
            if (
                process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
                (url.includes('res.cloudinary') || url.includes('web-assets'))
            ) {
                const { innerWidth } = window;

                const width = innerWidth >= DESKTOP_BREAKPOINT ? 1920 : innerWidth >= TABLET_BREAKPOINT ? 720 : 480;

                const videoUrl = myCld
                    .video(getCloudinaryMediaId(url))
                    .format('auto')
                    .resize(fit().width(width))
                    .toURL();

                setVideoUrl(transformCloudinaryUrl(videoUrl));
            } else {
                setVideoUrl(url);
            }
        };
        updateVideoUrl();
        window.addEventListener('resize', updateVideoUrl, { passive: true });

        return () => window.removeEventListener('resize', updateVideoUrl);
    }, [url]);

    return videoUrl;
};
