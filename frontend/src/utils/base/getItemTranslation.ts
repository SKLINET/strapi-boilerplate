export function getItemTranslation(
    obj: Record<string, any> | null | undefined,
    locale: string,
): Record<string, any> | null {
    if (obj?.localizations?.data) {
        for (const lc of obj.localizations.data) {
            if (lc?.attributes?.locale === locale) {
                return {
                    ...lc?.attributes,
                    slug: lc?.attributes?.slug || lc?.attributes?.url || '',
                };
            }
        }
    }

    return null;
}
