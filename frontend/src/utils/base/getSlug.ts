import CONFIG from '../../../sklinet.config.json';

export function getSlug(slug: string[] | string | null | undefined) {
    const last = Array.isArray(slug) ? slug[slug.length - 1] : slug;
    return last;
}

export function getNormalizedSlug(slug: string[] | string | null | undefined) {
    const defaultLocale = CONFIG.i18n.defaultLocale;
    const locales = CONFIG.i18n.locales;

    let _slug: string[] = [];

    if (Array.isArray(slug)) {
        _slug = slug;
    } else if (slug) {
        _slug = [slug];
    } else {
        _slug = ['homepage'];
    }

    const locale = locales.find((e) => e === _slug[0]);

    if (_slug.length > 0 && locale) {
        _slug = _slug.splice(1);

        if (_slug.length === 0) {
            if (locale === defaultLocale) {
                _slug = ['homepage'];
            } else {
                _slug = [`homepage-${locale}`];
            }
        }
    }

    return _slug;
}
