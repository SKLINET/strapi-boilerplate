import config from '../../../../sklinet.config.json';

export const getLocale = (slug: string[] | undefined) => {
    if (slug && slug.length > 0 && config.i18n.locales.includes(slug[0])) return slug[0];

    return config.i18n.defaultLocale;
};
