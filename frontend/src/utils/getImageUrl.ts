export function getImageUrl(url: string | null | undefined, includeHost = true): string {
    if (url?.indexOf('imgix') === -1) {
        const baseUrl = process.env.API_BASE_PATH;
        return new URL(url, baseUrl).toString();
    }

    if (includeHost) {
        return url || '';
    }

    return `${process.env.MEDIA_PATH}${new URL(url ?? '').pathname}`;
}
