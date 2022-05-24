export function getImageUrl(url: string | null | undefined, includeHost = true): string {
    if (process.env.IMGIX_PATH === undefined) {
        const baseUrl = process.env.API_BASE_PATH;
        return `${baseUrl}${url}`;
    }

    const baseUrl = includeHost ? `${process.env.IMGIX_PATH}` : process.env.MEDIA_PATH;

    return `${baseUrl}/${url?.replace('/uploads/', '')}`;
}
