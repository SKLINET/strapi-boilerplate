/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fit } from '@cloudinary/url-gen/actions/resize';
import { DESKTOP_BREAKPOINT, TABLET_BREAKPOINT } from '../../constants';
import { getCloudinaryMediaId } from '../../utils/getCloudinaryMediaId';

export const useVideoResize = (url: string) => {
    const [videoUrl, setVideoUrl] = useState(url);

    const myCld = new Cloudinary({
        cloud: {
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
        },
    });

    useEffect(() => {
        const updateVideoUrl = () => {
            let width = 1920;
            const { innerWidth } = window;
            if (innerWidth < TABLET_BREAKPOINT) {
                width = 480;
            } else if (innerWidth >= TABLET_BREAKPOINT && innerWidth < DESKTOP_BREAKPOINT) {
                width = 720;
            }

            const videoUrl = myCld.video(getCloudinaryMediaId(url)).resize(fit().width(width)).toURL();

            setVideoUrl(videoUrl);
        };
        updateVideoUrl();
        window.addEventListener('resize', updateVideoUrl, { passive: true });

        return () => window.removeEventListener('resize', updateVideoUrl);
    }, []);

    return videoUrl;
};
