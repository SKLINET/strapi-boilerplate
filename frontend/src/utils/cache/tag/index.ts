/**
 * Cache tag taxonomy and the read/write helpers around `next/cache`.
 *
 * A tag is the link between a cached entry and the CMS record it was built from. Render-time code
 * writes tags with {@link cacheTag}; the Strapi webhook burns them with {@link revalidateCacheTag}.
 * Both sides compose the string through {@link buildCacheTag}, so a rename can only ever break both
 * at once rather than silently orphaning entries.
 *
 * Tag format: `{type}` → `{type}-{locale}` → `{type}-{id}` → `{type}-{id}-{locale}`, depending on
 * which options are filled in.
 */
import { cacheTag as cacheTagNext, revalidateTag as revalidateTagNext } from 'next/cache';
import config from '../../../../sklinet.config.json';

/**
 * Strapi content types with `pluginOptions.i18n.localized: true`. Editors routinely change a single
 * language variant, so their tags carry the locale to keep the other language's cache intact.
 */
export type LocalizedCacheType =
    | 'page'
    | 'article'
    | 'article-category'
    | 'built-form'
    | 'menu'
    | 'system-resource'
    | 'template'
    | 'web-setting';

/** Strapi content types without i18n — their tags never carry a locale. */
export type GlobalCacheType = 'icon' | 'redirect';

/** Every content type the cache knows about. The revalidation route accepts nothing else. */
export type CacheType = LocalizedCacheType | GlobalCacheType;

/**
 * Runtime twin of {@link LocalizedCacheType}. Kept in sync with the type by `index.test.ts`, which
 * reads the Strapi schemas and fails if a content type is added, removed, or has its
 * `pluginOptions.i18n.localized` flag flipped.
 */
const LOCALIZED_TYPES: ReadonlySet<string> = new Set<LocalizedCacheType>([
    'page',
    'article',
    'article-category',
    'built-form',
    'menu',
    'system-resource',
    'template',
    'web-setting',
]);

/** Runtime twin of {@link GlobalCacheType}, verified against the CMS schemas by the same test. */
const GLOBAL_TYPES: ReadonlySet<string> = new Set<GlobalCacheType>(['icon', 'redirect']);

/**
 * Content types that only ever receive form submissions. They never appear on a page, so a webhook
 * for one of them is acknowledged and dropped rather than treated as an unknown model.
 */
export const SUBMISSION_MODELS: ReadonlySet<string> = new Set(['contact-message', 'newsletter-subscriber']);

/**
 * Next.js 16 requires a cacheLife profile as the second `revalidateTag` argument; the single-argument
 * form is deprecated. `max` expires the tag's entries outright, which is what a CMS publish means.
 */
const REVALIDATE_PROFILE = 'max';

/**
 * Narrowing options for a tag.
 *
 * @property id     Strapi `documentId`. Present on an entity tag, absent on a collective one.
 * @property locale Required for a localized type, ignored for a global one.
 */
interface TagOptions {
    id?: string;
    locale?: string;
}

/**
 * Type guard for the revalidation route's `model` / `tag` input. Without it a typo in the Strapi
 * webhook would return 200 OK and silently invalidate nothing.
 *
 * @param {string} model - Raw string from the webhook body or query string
 * @returns {boolean} True when the string names a content type the cache knows
 **/
export const isKnownCacheType = (model: string): model is CacheType =>
    LOCALIZED_TYPES.has(model) || GLOBAL_TYPES.has(model);

/**
 * Composes the tag string. The single place that decides tag shape, used by both the write and the
 * invalidate path.
 *
 * A localized type without a locale returns an **empty string** and logs — it deliberately does not
 * throw, so a missing locale cannot crash a render. {@link cacheTag} then skips the write, because
 * no tag is better than a tag nothing can invalidate.
 *
 * @param {CacheType} type - Content type the entry was built from
 * @param {TagOptions} opts - Optional `id` and `locale` narrowing
 * @returns {string} The composed tag, or `''` when a localized type is missing its locale
 **/
export const buildCacheTag = (type: CacheType, opts: TagOptions = {}): string => {
    const parts: string[] = [type];

    if (opts.id) parts.push(opts.id);

    if (LOCALIZED_TYPES.has(type)) {
        if (!opts.locale) {
            console.log(`Cache tag "${type}" requires a locale`);
            return '';
        }
        parts.push(opts.locale);
    }

    return parts.join('-');
};

/** Opt-in tracing, off in production unless the flag is set. */
const logCache = (message: string): void => {
    if (process.env.NEXT_PUBLIC_ALLOW_CACHE_LOGS === '1') {
        console.log(message);
    }
};

/** Opt-in tracing for the invalidation side, driven by its own flag. */
const logRevalidate = (message: string): void => {
    if (process.env.NEXT_PUBLIC_ALLOW_REVALIDATE_LOGS === '1') {
        console.log(message);
    }
};

/**
 * Write path — attaches a tag to the surrounding `'use cache'` entry.
 *
 * Only callable inside a `'use cache'` scope; `next/cache` throws otherwise. Called during render,
 * where the locale is known from context.
 *
 * @param {CacheType} type - Content type this entry was built from
 * @param {TagOptions} opts - Optional `id` (entity tag) and `locale`
 **/
export const cacheTag = (type: CacheType, opts: TagOptions = {}): void => {
    const tag = buildCacheTag(type, opts);

    // An empty tag can never be revalidated, so writing it would pin the entry for its whole
    // cacheLife. `buildCacheTag` has already logged why it is empty.
    if (!tag) return;

    logCache(`💾 Set cache tag ${tag}`);
    cacheTagNext(tag);
};

/**
 * Invalidate path — expires every entry carrying the tag.
 *
 * Driven by a webhook payload that may be incomplete (bulk Strapi actions, or a singleType publish
 * that carries no locale). Dropping the invalidation would leave stale content served, so a missing
 * locale fans out across every configured locale instead of giving up.
 *
 * @param {CacheType} type - Content type the editor changed
 * @param {TagOptions} opts - Optional `id` (entity tag) and `locale`; without a locale a localized type fans out
 **/
export const revalidateCacheTag = (type: CacheType, opts: TagOptions = {}): void => {
    if (LOCALIZED_TYPES.has(type) && !opts.locale) {
        for (const locale of config.i18n.locales) {
            const tag = buildCacheTag(type, { ...opts, locale });

            logRevalidate(`🧹 Revalidating cache tag ${tag}`);
            revalidateTagNext(tag, REVALIDATE_PROFILE);
        }
        return;
    }

    const tag = buildCacheTag(type, opts);

    logRevalidate(`🧹 Revalidating cache tag ${tag}`);
    revalidateTagNext(tag, REVALIDATE_PROFILE);
};
