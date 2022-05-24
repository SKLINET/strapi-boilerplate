export function getPageUrl(page: string, externalUrl = '', includeHost?: boolean): string {
    const baseUrl = includeHost ? `${process.env.BASE_PATH}` : '';
    if (page) {
        return `${baseUrl}/${page?.replace('homepage', '')}`;
    } else if (externalUrl) {
        return externalUrl;
    }
    return '';
}
