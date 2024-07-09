import { IApp } from '../../types/base/app';
import { getItemTranslation } from './getItemTranslation';
import config from '../../../sklinet.config.json';

export const getTranslatedUrl = (locale: string, app: IApp): string | null => {
    if (typeof window === 'undefined') return null;

    const defaultLocale = config?.i18n?.defaultLocale || 'cs';
    const trans = getItemTranslation(app?.page, locale);
    const localePart = locale === defaultLocale ? '' : `/${locale}`;
    let url = `${process.env.NEXT_PUBLIC_BASE_PATH}${localePart}${window.location.search}`;
    if (trans?.url) {
        if (trans?.url?.includes(':slug')) {
            const objTrans = getItemTranslation((app?.item as Record<string, any>)?.attributes || {}, locale);
            if (objTrans?.slug) {
                url = `${process.env.NEXT_PUBLIC_BASE_PATH}${localePart}/${trans.url?.replace(':slug', objTrans?.slug)}${
                    window.location.search
                }`;
            }
        } else {
            url = `${process.env.NEXT_PUBLIC_BASE_PATH}${localePart}/${trans.url
                ?.replace('homepage-en', '')
                ?.replace('homepage', '')}${window.location.search}`;
        }
    }

    return url;
};
