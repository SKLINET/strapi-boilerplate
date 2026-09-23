/**
 * Tagging of the page-level cache entries.
 *
 * `cachedStaticProps` and `cachedMetadata` cache a whole page's data in one entry. This module walks
 * that payload and writes a tag for every CMS record it contains, so publishing any one of them
 * expires exactly the pages that show it.
 *
 * Two kinds of tag come out of here:
 *  - **entity** (`article-a1-cs`) — one record the page renders, written by {@link tagBlocks};
 *  - **structural** (`web-setting-cs`, `menu-…`, `redirect`) — chrome every page depends on.
 *
 * Collective listing tags (`article-cs`, `article-category-cs`) are **not** written here. Every
 * listing loads in its own `Server.tsx` cache scope; repeating the tag on the page shell would make
 * one article publication discard the whole homepage. See `utils/cache/streamListing`.
 */
import config from '../../../../sklinet.config.json';
import { cacheTag, type CacheType } from '../tag';

/**
 * GraphQL `__typename` → cache type, for records found anywhere in a page payload.
 *
 * A typename missing from this map is skipped rather than guessed at, so adding a CMS content type
 * means adding it here too — otherwise its records render untagged and survive a publish.
 */
const TYPENAME_TO_CACHE_TYPE: Record<string, CacheType> = {
    Article: 'article',
    ArticleCategory: 'article-category',
    FormBuilderBuiltForm: 'built-form',
    Icon: 'icon',
    Menu: 'menu',
    SystemResource: 'system-resource',
    Template: 'template',
};

/** Types whose tags must not carry a locale, mirroring `GLOBAL_TYPES` in `../tag`. */
const GLOBAL_CACHE_TYPES = new Set<CacheType>(['icon', 'redirect']);

/** A record found in a page payload that is worth its own entity tag. */
interface TaggableEntity {
    typename: string;
    documentId: string;
}

/**
 * Depth-first walk collecting every `{ __typename, documentId }` pair in an arbitrary payload.
 *
 * Both keys must be present: `__typename` alone cannot be invalidated, and `documentId` alone cannot
 * be mapped to a cache type. Relay payloads contain cycles, so `seen` guards against infinite
 * recursion rather than merely deduplicating.
 *
 * @param {unknown} node - Any part of the payload — object, array, or scalar
 * @param {TaggableEntity[]} acc - Accumulator, mutated in place
 * @param {WeakSet<object>} seen - Objects already visited on this walk
 * @returns {TaggableEntity[]} The accumulator
 **/
const collectTaggableEntities = (node: unknown, acc: TaggableEntity[], seen: WeakSet<object>): TaggableEntity[] => {
    if (node == null || typeof node !== 'object') {
        return acc;
    }

    if (seen.has(node)) {
        return acc;
    }
    seen.add(node);

    if (Array.isArray(node)) {
        for (const item of node) {
            collectTaggableEntities(item, acc, seen);
        }
        return acc;
    }

    const record = node as Record<string, unknown>;
    if (typeof record.__typename === 'string' && typeof record.documentId === 'string' && record.documentId) {
        acc.push({ typename: record.__typename, documentId: record.documentId });
    }

    for (const value of Object.values(record)) {
        collectTaggableEntities(value, acc, seen);
    }

    return acc;
};

/**
 * Writes an entity tag for every CMS record inside `node`.
 *
 * Used both for the page payload and by the list loaders in `fetchData/*`, so their own entries
 * carry the same tags. Note that list queries do not always select `__typename` at record level; on
 * those payloads this is close to a no-op and the collective tag does the real work.
 *
 * @param {unknown} node - Payload to walk
 * @param {string} locale - Locale for the localized tags
 **/
export const tagBlocks = (node: unknown, locale: string): void => {
    const entities = collectTaggableEntities(node, [], new WeakSet());

    for (const entity of entities) {
        const cacheType = TYPENAME_TO_CACHE_TYPE[entity.typename];
        if (!cacheType) {
            continue;
        }

        if (GLOBAL_CACHE_TYPES.has(cacheType)) {
            cacheTag(cacheType, { id: entity.documentId });
        } else {
            cacheTag(cacheType, { id: entity.documentId, locale });
        }
    }
};

/**
 * Typenames a *detail* page can be about. Narrower than {@link TYPENAME_TO_CACHE_TYPE} on purpose:
 * only an article has its own detail route, so only it can be `app.item`.
 */
const ITEM_TYPENAME_TO_CACHE_TYPE: Record<string, CacheType> = {
    Article: 'article',
};

/**
 * The slice of `getStaticProps` / `getMetadata` output that tagging needs. Deliberately structural
 * rather than the full app type, so `cachedMetadata` can pass its thinner payload unchanged.
 */
export interface TagPageInput {
    locale: string;
    page?: {
        documentId?: string | null;
        url?: string | null;
        content?: unknown;
    } | null;
    webSetting?: {
        documentId?: string | null;
        homePage?: { documentId?: string | null } | null;
        articlesPage?: { documentId?: string | null } | null;
        articleDetailPage?: { documentId?: string | null } | null;
        mainMenu?: { documentId?: string | null } | null;
    } | null;
    item?: {
        __typename?: string | null;
        documentId?: string | null;
    } | null;
    blocksPropsMap?: unknown;
}

/** Tags one page reference from the web settings, skipping an unresolved one. */
const tagPageRef = (page: { documentId?: string | null } | null | undefined, locale: string): void => {
    if (page?.documentId) {
        cacheTag('page', { id: page.documentId, locale });
    }
};

/** Tags one menu reference from the web settings, skipping an unresolved one. */
const tagMenu = (menu: { documentId?: string | null } | null | undefined, locale: string): void => {
    if (menu?.documentId) {
        cacheTag('menu', { id: menu.documentId, locale });
    }
};

/**
 * Tagging for a 404 entry. Only the bare `page-{locale}` tag: nothing is known about which record
 * *would* have matched, so any page publish in that locale has to expire it — a URL becoming valid
 * is exactly the case this must catch.
 *
 * @param {string} locale - Locale of the request that missed
 **/
export const tagNotFoundPage = (locale: string): void => {
    cacheTag('page', { locale });
};

/** CMS pages that exist as real records but must never be served with a 200 at their own URL. */
const SYSTEM_PAGE_SLUGS = ['404', '500'];

/**
 * True when the request targets a CMS system page by its own URL (`/404`, `/500`, or their localized
 * form). Those pages exist in the CMS, so nothing else marks them as not found — but letting a search
 * engine index the error page as a real one is a mixed signal, so `generateMetadata` noindexes them.
 *
 * @param {string[]} slug - Raw slug segments from the route params
 * @returns {boolean} True when the slug points at a CMS system page
 **/
export const isSystemPageSlug = (slug: string[]): boolean => {
    const path = (slug || []).filter(Boolean);
    const locales = config.i18n.locales as string[];
    const withoutLocale = path.length > 1 && locales.includes(path[0]) ? path.slice(1) : path;

    return withoutLocale.length === 1 && SYSTEM_PAGE_SLUGS.includes(withoutLocale[0]);
};

/**
 * Writes every tag a successfully rendered page needs. Called from inside the `'use cache'` scope of
 * `cachedStaticProps` and `cachedMetadata`.
 *
 * Order of business: structural chrome, then the page record, then the detail item, then entity
 * tags for everything in the payload. Listing blocks write their own collective tags.
 *
 * @param {TagPageInput} app - Page payload, already resolved
 **/
export const tagPage = (app: TagPageInput): void => {
    const { locale } = app;

    cacheTag('redirect');
    cacheTag('system-resource', { locale });

    if (app.webSetting) {
        if (app.webSetting.documentId) {
            cacheTag('web-setting', { id: app.webSetting.documentId, locale });
        }
        cacheTag('web-setting', { locale });
        tagPageRef(app.webSetting.homePage, locale);
        tagPageRef(app.webSetting.articlesPage, locale);
        tagPageRef(app.webSetting.articleDetailPage, locale);
        tagMenu(app.webSetting.mainMenu, locale);
    }

    if (app.page?.documentId) {
        cacheTag('page', { id: app.page.documentId, locale });
    }

    if (app.item?.__typename && app.item.documentId) {
        const itemType = ITEM_TYPENAME_TO_CACHE_TYPE[app.item.__typename];
        if (itemType) {
            cacheTag(itemType, { id: app.item.documentId, locale });
        }
    }

    tagBlocks(app.page?.content, locale);
    tagBlocks(app.blocksPropsMap, locale);
};
