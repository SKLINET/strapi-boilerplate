import { useEffect, useState } from 'react';
import { IImage } from '../../types/image';
import { getImageUrl } from '../getImageUrl';

interface UseBlurDataUrlProps {
    image: IImage | undefined;
    allow: boolean;
}

const LIGHT_GREY_PLACEHOLDER =
    'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABrSURBVHgB7dABAQAgAIMwtH/XR9AgsAg72x5iF7kCkCsAuQKQKwC5ApArALkCkCsAuQKQKwC5ApArALkCkCsAuQKQKwC5ApArALkCkCsAuQKQKwC5ApArALkCkCsAuQKQKwC5ApArALkCkPtI5gRMZnZCewAAAABJRU5ErkJggg==';

export const useBlurDataUrl = ({ image, allow }: UseBlurDataUrlProps) => {
    const [data, setData] = useState(`data:image/webp;base64,${LIGHT_GREY_PLACEHOLDER}`);

    useEffect(() => {
        if (!image || !allow) return;

        const getBlurDataURL = (src: string): string | null => {
            // Image from Strapi
            if (src.includes('uploads')) {
                return null;
            }

            // Cloudinary optimization
            if (src.includes('upload')) {
                const srcParts = src.split('upload');
                if (srcParts.length !== 2) return src;

                return `${srcParts[0]}upload/f_auto/fl_lossy/w_50/dpr_auto/q_10${srcParts[1]}`;
            }

            return null;
        };

        const src = getBlurDataURL(getImageUrl(image.url));

        const getBase64Image = async () => {
            try {
                if (!src) throw new Error();

                const response = await fetch(src);
                const buffer = await response.arrayBuffer();
                const data = Buffer.from(buffer).toString('base64');

                setData(`data:image/webp;base64,${data}`);
            } catch (err) {
                setData(`data:image/webp;base64,${LIGHT_GREY_PLACEHOLDER}`);
            }
        };
        getBase64Image();
    }, [image, allow]);

    return data;
};
