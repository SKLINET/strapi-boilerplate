const CLOUDINARY_PATTERN = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`;
const API_ASSETS_BASE = `${process.env.NEXT_PUBLIC_BASE_PATH}/api/web-assets`;

/**
 * Transforms a Cloudinary URL to use our asset proxy while preserving transformations
 */
export function transformCloudinaryUrl(url: string | null | undefined): string {
    if (!url) return '';

    if (url.includes('res.cloudinary')) {
        const uploadIndex = url.indexOf('upload');
        if (uploadIndex === -1) return url;

        const base = url.substring(0, uploadIndex);
        const rest = url.substring(uploadIndex);

        return base.replace(CLOUDINARY_PATTERN, API_ASSETS_BASE) + rest;
    }

    return url;
}
