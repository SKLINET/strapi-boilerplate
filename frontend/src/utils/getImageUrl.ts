export function getImageUrl(url: string | null | undefined, smallResolution = false): string {
    const baseUrl = process.env.API_BASE_PATH || process.env.NEXT_PUBLIC_API_BASE_PATH;

    // Image from Cloudinary
    if (url?.startsWith('http') || url?.startsWith('https')) {
        if (smallResolution) {
            const urlParts = url.split('upload');
            if (urlParts.length !== 2) return url;

            return `${urlParts[0]}upload/f_avif,f_webp,f_jpg/fl_lossy/w_1200/dpr_auto/q_75${urlParts[1]}`;
        }

        return url;
    }

    // Image from Strapi
    if (url?.startsWith('/uploads/')) {
        return `${baseUrl}${url}`;
    }

    return `${baseUrl}${url}`;
}
