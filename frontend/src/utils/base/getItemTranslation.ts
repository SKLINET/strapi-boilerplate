export function getItemTranslation(
    obj: Record<string, any> | null | undefined,
    locale: string,
): Record<string, any> | null {
    if (obj?.localizations) {
        for (const lc of obj.localizations) {
            if (lc?.locale === locale) {
                return {
                    ...lc,
                    slug: lc?.slug || lc?.url || '',
                };
            }
        }
    }

    return null;
}
