import { IApp } from '../types/base/app';
import { getPageUrl } from './getPageUrl';

export function getItemUrl(baseUrl: string, item: Record<string, any>, app: IApp): string {
    const url = baseUrl?.startsWith('/') ? '' : '/' + baseUrl?.replace(':slug', item?.url || item?.slug || '');

    return getPageUrl(url, app.locale);
}
