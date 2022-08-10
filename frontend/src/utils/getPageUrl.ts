type Page = { data: { attributes: { url: string } } } | null | undefined;

export function getPageUrl(page: Page, externalUrl = '', includeHost = false, locale = ''): string {
    const baseUrl = includeHost ? `${process.env.BASE_PATH}` : '';
    if (page && page?.data?.attributes?.url !== undefined) {
        return `${baseUrl}/${locale ? `${locale}/` : ''}${page?.data?.attributes?.url
            ?.replace('homepage-en', '')
            ?.replace('homepage', '')}`;
    } else if (externalUrl) {
        return externalUrl;
    }
    return '';
}
