import config from '../../sklinet.config.json';

export function getPageUrl(page: string, externalUrl = '', includeHost?: boolean): string {
    const { i18n } = config;
    if (page?.startsWith('http://') || page?.startsWith('https://')) {
        return page;
    }

    const baseUrl = includeHost ? `${process.env.BASE_PATH}` : '';
    if (page) {
        let pagePart = page;
        for (const lc of i18n.locales) {
            pagePart = pagePart?.replace(`homepage-${lc}`, '');
        }
        pagePart = pagePart?.replace('homepage', '');
        return `${baseUrl}${pagePart?.startsWith('/') ? '' : '/'}${pagePart}`;
    } else if (externalUrl) {
        return externalUrl;
    }
    return '';
}
