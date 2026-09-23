/**
 * Preview (draft mode) must never write a `'use cache'` entry. Editors expect the document they
 * just saved in Strapi, not a draft snapshot from an earlier request.
 *
 * Callers keep a single entry point: the published branch runs the `'use cache'` impl, the preview
 * branch runs the same uncached fetch. `preview` is therefore a routing flag, not a cache-key
 * fragment.
 *
 * @param {boolean | undefined} preview - Whether the surrounding request is in draft mode
 * @param {() => Promise<T>} readCached - The `'use cache'` function; must not run when `preview` is true
 * @param {() => Promise<T>} readFresh - The uncached fetch used for draft requests
 * @returns {Promise<T>} Data from whichever branch applies
 **/
export const bypassCacheIfPreview = async <T>(
    preview: boolean | undefined,
    readCached: () => Promise<T>,
    readFresh: () => Promise<T>,
): Promise<T> => {
    if (preview) {
        return readFresh();
    }

    return readCached();
};
