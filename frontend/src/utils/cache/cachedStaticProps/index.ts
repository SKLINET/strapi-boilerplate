/**
 * The page data cache entry — the largest and most important boundary in the app.
 *
 * One entry holds the page record, the resolved detail item and the web settings. Listing block data
 * lives in its own `'use cache'` scope under `Server.tsx`, so `tagPage` writes only structural and
 * entity tags and publishing an article does not discard the homepage shell.
 *
 * `getStaticProps` still reads `draftMode()` to pick DRAFT vs PUBLISHED. The page component must not
 * do that itself — nothing above the block Suspense boundaries may touch a dynamic API. This wrapper
 * reads `draftMode()` outside `'use cache'` and skips that scope in preview; see
 * {@link bypassCacheIfPreview}.
 */
import { cache } from 'react';
import { cacheLife } from 'next/cache';
import { draftMode } from 'next/headers';
import { getStaticProps } from '../../base/getStaticProps';
import { getItemFromPageResponse } from '../../base/getItemFromPageResponse';
import { tagNotFoundPage, tagPage } from '../page';
import { bypassCacheIfPreview } from '../preview';

const loadStaticProps = async (slug: string[]) => {
    const data = await getStaticProps({ params: { slug } });
    const item = getItemFromPageResponse(data);

    return { ...data, item };
};

const cachedStaticPropsImpl = async (slug: string[], locale: string) => {
    'use cache';

    const app = await loadStaticProps(slug);

    // `isNotFound` comes from `getStaticProps`, which is the only place that knows why the lookup
    // failed. Re-deriving it here from `page.url === '404'` could not tell a rewritten unknown URL
    // apart from the CMS 404 page requested by its own slug.
    if (app.isNotFound) {
        // 'minutes' rather than 'default': a 404 is usually a URL that does not exist *yet*, and a
        // short life bounds how long it stays wrong once the editor publishes it.
        cacheLife('minutes');
        tagNotFoundPage(locale);
    } else {
        cacheLife('default');
        tagPage({
            locale,
            page: app.page,
            webSetting: app.webSetting,
            item: app.item,
            blocksPropsMap: app.blocksPropsMap,
        });
    }

    return app;
};

/**
 * The only entry point for page data — `page.tsx` and `not-found.tsx` both go through it.
 *
 * Published requests go through `'use cache'`. Preview reads `draftMode()` here, outside that scope,
 * and then loads through `getStaticProps` with no cacheLife or tags, so an editor refresh always
 * hits Strapi. The `cache()` wrapper dedupes repeated reads within one render.
 *
 * @param {string[]} slug - Raw slug segments from the route params
 * @param {string} locale - Locale resolved from the slug
 * @returns {Promise<Awaited<ReturnType<typeof loadStaticProps>>>} Page payload with its resolved detail item
 **/
export const cachedStaticProps = cache(async (slug: string[], locale: string) => {
    const { isEnabled: preview } = await draftMode();

    return bypassCacheIfPreview(
        preview,
        () => cachedStaticPropsImpl(slug, locale),
        () => loadStaticProps(slug),
    );
});
