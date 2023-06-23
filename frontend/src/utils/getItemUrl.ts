export function getItemUrl(baseUrl: string, item: Record<string, any>): string {
    return baseUrl?.startsWith('/') ? '' : '/' + baseUrl?.replace(':slug', item?.attributes?.url || '');
}
