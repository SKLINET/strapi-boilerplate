import config from '../../sklinet.config.json';

export function getPageUrl(page: string | null | undefined, locale: string, includeHost = false): string {
    const { locales, defaultLocale } = config.i18n;

    const _locale = !locale || locale.length === 0 ? defaultLocale : locale;

    if (!page) return '';

    if (page.startsWith('http://') || page.startsWith('https://')) {
        return page;
    }

    let pagePart = page;
    for (const locale of locales) {
        pagePart = pagePart?.replace(`homepage-${locale}`, '');
    }
    pagePart = pagePart?.replace('homepage', '');

    const basePart = includeHost ? `${process.env.NEXT_PUBLIC_BASE_PATH}` : '';
    const localPart = _locale === defaultLocale ? '/' : `/${_locale}/`;

    const href = basePart + localPart + (pagePart.startsWith('/') ? pagePart.slice(1) : pagePart);

    return href;
}
