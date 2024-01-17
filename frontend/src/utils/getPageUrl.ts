import config from '../../sklinet.config.json';

export function getPageUrl(page: string | null | undefined, locale = config.i18n.defaultLocale): string {
    const { locales, defaultLocale } = config.i18n;

    if (!page) return '';

    if (page.startsWith('http://') || page.startsWith('https://')) {
        return page;
    }

    let pagePart = page;
    for (const locale of locales) {
        pagePart = pagePart?.replace(`homepage-${locale}`, '');
    }
    pagePart = pagePart?.replace('homepage', '');

    const localPart = locale === defaultLocale ? '/' : `/${locale}/`;

    const href = localPart + (pagePart.startsWith('/') ? pagePart.slice(1) : pagePart);

    return href;
}
