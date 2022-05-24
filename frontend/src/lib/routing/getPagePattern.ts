function getPatternFromQueryObject(slug: string[] | string): string | null {
    if (Array.isArray(slug) && slug.length > 0) {
        return '^' + slug.join('\\/') + '$';
    } else if (slug && !Array.isArray(slug)) {
        return '^' + slug + '$';
    } else {
        return '^homepage$';
    }
}

function getDynamicPatternFromQueryObject(slug: string[] | string): string | null {
    const dynamicPattern = ':([^/]+?)';

    if (Array.isArray(slug) && slug.length > 1) {
        return '^' + slug.slice(0, slug.length - 1).join('\\/') + '\\/' + dynamicPattern + '$';
    } else {
        return null;
    }
}

function getCatchAllPatternFromQueryObject(slug: string[] | string): string | null {
    if (Array.isArray(slug) && slug.length > 1) {
        return '^' + slug.slice(0, 2).join('/') + '/\\*$|^' + slug.slice(0, 1).join('\\/') + '/\\.*$';
    } else {
        return null;
    }
}

export function getPagePattern(slug: string[] | string): string {
    const pattern = getPatternFromQueryObject(slug);
    const dynamicPattern = getDynamicPatternFromQueryObject(slug);
    const catchAllPattern = getCatchAllPatternFromQueryObject(slug);

    if (!pattern) {
        return 'Nesmyslna adresa';
    }

    return dynamicPattern ? pattern + '|' + dynamicPattern + '|' + catchAllPattern : pattern;
}
