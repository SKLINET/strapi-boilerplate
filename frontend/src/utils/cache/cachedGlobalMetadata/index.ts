/**
 * Cache entries that are global rather than per-page: the site-wide SEO defaults and the redirect
 * table. Both are read on every request, so they get their own entries instead of riding on each
 * page's payload.
 *
 * These two are the only readers that pass `tags` down into the Relay environment, so they cache on
 * *both* levels: the `'use cache'` entry here, and the underlying GraphQL POST in Next's fetch cache.
 * The `fetchData/*` loaders deliberately do not.
 */
import { cacheLife } from 'next/cache';
import { fetchQuery } from 'relay-runtime';
import { createRelayEnvironment } from '../../../relay/createRelayEnvironment';
import { MetadataGlobalQuery } from '../../../relay/metadata';
import { AppRedirectQuery } from '../../../relay/app';
import { metadataGlobalQuery } from '../../../relay/__generated__/metadataGlobalQuery.graphql';
import { appRedirectQuery } from '../../../relay/__generated__/appRedirectQuery.graphql';
import getPublicationState from '../../base/getPublicationState';
import { buildCacheTag, cacheTag } from '../tag';

/**
 * Site-wide SEO defaults from the web settings singleton.
 *
 * Read in the published state even in preview: `generateMetadata` runs above the block Suspense
 * boundary, where no dynamic API may be touched, so there is no draft-mode signal to act on. The
 * preview branch in `PageProvider` queries Strapi directly instead of calling this.
 *
 * Tags in two passes — the collective `web-setting-{locale}` up front so the entry is invalidatable
 * even if the query returns nothing, then the entity tag once the `documentId` is known.
 *
 * @param {string} locale - Locale to read the settings for
 * @returns {Promise<metadataGlobalQuery['response'] | undefined>} Global metadata payload
 **/
export async function cachedGlobalMetadata(locale: string) {
    'use cache';
    cacheLife('default');
    cacheTag('web-setting', { locale });

    const environment = createRelayEnvironment(
        {},
        { preview: false, tags: [buildCacheTag('web-setting', { locale })] },
    );

    const data = await fetchQuery<metadataGlobalQuery>(environment, MetadataGlobalQuery, {
        locale,
        status: getPublicationState(false),
    }).toPromise();

    const documentId = (data?.webSetting as { documentId?: string | null } | null | undefined)?.documentId;
    if (documentId) {
        cacheTag('web-setting', { id: documentId, locale });
    }

    return data;
}

/**
 * Looks up a CMS redirect for one incoming path.
 *
 * Runs on every request that misses a known route, so it is cached per path. Redirects are a global
 * (non-localized) type, hence the bare `redirect` tag: publishing any redirect expires every lookup,
 * which is the cheap and correct trade for a table this small.
 *
 * @param {string} redirectPath - Incoming path to resolve
 * @returns {Promise<appRedirectQuery['response'] | undefined>} Redirect payload, if one matches
 **/
export async function cachedAppRedirect(redirectPath: string) {
    'use cache';
    cacheLife('default');
    cacheTag('redirect');

    const environment = createRelayEnvironment({}, { preview: false, tags: [buildCacheTag('redirect')] });

    return fetchQuery<appRedirectQuery>(environment, AppRedirectQuery, {
        redirect: redirectPath,
        status: getPublicationState(false),
    }).toPromise();
}
