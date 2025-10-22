import { transformCloudinaryUrl } from './cloudinary/cloudinaryUrl';

export function getImageUrl(url: string | null | undefined, smallResolution = false): string {
    if (!url) return '';

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_PATH || process.env.API_BASE_PATH;

    // Image from Cloudinary
    if (url.includes('res.cloudinary')) {
        if (smallResolution) {
            const urlParts = url.split('upload');
            if (urlParts.length !== 2) return url;

            return transformCloudinaryUrl(
                `${urlParts[0]}upload/f_avif,f_webp,f_jpg/fl_lossy/w_1200/dpr_auto/q_75${urlParts[1]}`,
            );
        }

        return transformCloudinaryUrl(url);
    }

    // Web assets (cloudinary proxy) or external images
    if (url.includes('http')) {
        return url;
    }

    // Image from Strapi
    if (url.startsWith('/uploads/')) {
        return `${baseUrl}${url}`;
    }

    return `${baseUrl}${url}`;
}
