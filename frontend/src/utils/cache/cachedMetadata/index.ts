/**
 * The page metadata cache entry, feeding `generateMetadata` in the root layout.
 *
 * Deliberately separate from `cachedStaticProps` even though both describe the same URL: Next calls
 * `generateMetadata` and the page render independently, and metadata needs only a fraction of the
 * payload. Both tag through the same `tagPage`, so one publish expires both together.
 *
 * Preview never enters `'use cache'` — see {@link bypassCacheIfPreview}.
 */
import { cache } from 'react';
import { cacheLife } from 'next/cache';
import { draftMode } from 'next/headers';
import { getMetadata } from '../../base/getMetadata';
import { tagNotFoundPage, tagPage } from '../page';
import { bypassCacheIfPreview } from '../preview';

const loadMetadata = async (slug: string[]) => getMetadata({ params: { slug } });

const cachedMetadataImpl = async (slug: string[], locale: string) => {
    'use cache';

    const data = await loadMetadata(slug);

    // Same signal `cachedStaticProps` uses, so the `robots` header and the rendered page always agree.
    if (data.isNotFound) {
        cacheLife('minutes');
        tagNotFoundPage(locale);
    } else {
        cacheLife('default');
        tagPage({
            locale,
            page: data.page,
            webSetting: data.webSetting
                ? { documentId: (data.webSetting as { documentId?: string | null }).documentId }
                : null,
            blocksPropsMap: data.blocksPropsMap,
        });
    }

    return data;
};

/**
 * The only entry point for page metadata — `generateMetadata` in the root layout.
 *
 * @param {string[]} slug - Raw slug segments from the route params
 * @param {string} locale - Locale resolved from the slug
 * @returns {Promise<Awaited<ReturnType<typeof loadMetadata>>>} Metadata payload for the URL
 **/
export const cachedMetadata = cache(async (slug: string[], locale: string) => {
    const { isEnabled: preview } = await draftMode();

    return bypassCacheIfPreview(
        preview,
        () => cachedMetadataImpl(slug, locale),
        () => loadMetadata(slug),
    );
});
