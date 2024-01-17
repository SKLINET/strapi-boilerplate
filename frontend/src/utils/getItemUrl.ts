import { IApp } from '../types/app';
import { getPageUrl } from './getPageUrl';

export function getItemUrl(baseUrl: string, item: Record<string, any>, app: IApp): string {
    const url = baseUrl?.startsWith('/')
        ? ''
        : '/' + baseUrl?.replace(':slug', item?.attributes?.url || item?.attributes?.slug || '');

    return getPageUrl(url, app.locale);
}
