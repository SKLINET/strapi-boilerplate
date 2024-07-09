/*
export function getImageUrl(url: string | null | undefined, includeHost = true): string {
    if (process.env.IMGIX_PATH === undefined) {
        const baseUrl = process.env.API_BASE_PATH;
        return `${baseUrl}${url}`;
    }

    const baseUrl = includeHost ? `${process.env.IMGIX_PATH}` : process.env.MEDIA_PATH;

    return `${baseUrl}/${url?.replace('/uploads/', '')}`;
}
    */

export function getImageUrl(url: string | null | undefined, smallResolution = false): string {
    const baseUrl = process.env.API_BASE_PATH;

    if (url?.startsWith('http') || url?.startsWith('https')) {
        if (smallResolution) {
            const urlParts = url.split('upload');
            if (urlParts.length !== 2) return url;

            return `${urlParts[0]}upload/f_jpg/fl_lossy/w_1200/dpr_auto/q_75${urlParts[1]}`;
        }

        return url;
    }

    return `${baseUrl}${url}`;
}
