import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import config from '../../../../sklinet.config.json';

const cacheTagNext = vi.fn();
const revalidateTagNext = vi.fn();

vi.mock('next/cache', () => ({
    cacheTag: (...args: string[]) => cacheTagNext(...args),
    revalidateTag: (...args: unknown[]) => revalidateTagNext(...args),
}));

import { SUBMISSION_MODELS, buildCacheTag, cacheTag, isKnownCacheType, revalidateCacheTag } from './index';

const [firstLocale] = config.i18n.locales;

beforeEach(() => {
    cacheTagNext.mockClear();
    revalidateTagNext.mockClear();
});

describe('buildCacheTag', () => {
    it('should append the locale for a localized type', () => {
        expect(buildCacheTag('page', { locale: 'cs' })).toBe('page-cs');
    });

    it('should place the documentId before the locale for a localized entity', () => {
        expect(buildCacheTag('page', { id: 'abc123', locale: 'cs' })).toBe('page-abc123-cs');
    });

    it('should omit the locale for a type without i18n', () => {
        expect(buildCacheTag('redirect')).toBe('redirect');
    });

    it('should append only the documentId for an entity without i18n', () => {
        expect(buildCacheTag('icon', { id: 'i1' })).toBe('icon-i1');
    });

    it('should ignore a locale passed for a type without i18n', () => {
        expect(buildCacheTag('redirect', { locale: 'cs' })).toBe('redirect');
    });

    it('should return an empty tag rather than throwing when a localized type has no locale', () => {
        // Deliberate: a missing locale must not crash a render.
        expect(buildCacheTag('page')).toBe('');
    });
});

describe('cacheTag (write path)', () => {
    it('should forward the composed tag to next/cache', () => {
        cacheTag('article', { id: 'a1', locale: 'cs' });

        expect(cacheTagNext).toHaveBeenCalledExactlyOnceWith('article-a1-cs');
    });

    it('should skip the write when the locale is missing', () => {
        // An empty tag can never be revalidated, so writing it would pin the entry for its whole
        // cacheLife — no tag is strictly better.
        expect(() => cacheTag('article', { id: 'a1' })).not.toThrow();
        expect(cacheTagNext).not.toHaveBeenCalled();
    });
});

describe('revalidateCacheTag (invalidate path, fail-safe)', () => {
    it('should forward the composed tag when the locale is known', () => {
        revalidateCacheTag('page', { id: 'p1', locale: 'cs' });

        expect(revalidateTagNext).toHaveBeenCalledExactlyOnceWith('page-p1-cs', 'max');
    });

    it('should invalidate every configured locale when the payload omits one', () => {
        revalidateCacheTag('page', { id: 'p1' });

        expect(revalidateTagNext).toHaveBeenCalledTimes(config.i18n.locales.length);
        for (const locale of config.i18n.locales) {
            expect(revalidateTagNext).toHaveBeenCalledWith(`page-p1-${locale}`, 'max');
        }
    });

    it('should never throw on a missing locale, so an incomplete webhook payload still invalidates', () => {
        expect(() => revalidateCacheTag('article')).not.toThrow();
        expect(revalidateTagNext).toHaveBeenCalledWith(`article-${firstLocale}`, 'max');
    });

    it('should not fan out across locales for a type without i18n', () => {
        revalidateCacheTag('redirect');

        expect(revalidateTagNext).toHaveBeenCalledExactlyOnceWith('redirect', 'max');
    });
});

describe('isKnownCacheType', () => {
    it.each(['page', 'article', 'article-category', 'built-form', 'web-setting', 'redirect', 'icon'])(
        'should accept %s',
        (model) => {
            expect(isKnownCacheType(model)).toBe(true);
        },
    );

    it.each(['', 'user', 'api::page.page', 'Page', 'contact-message'])('should reject %s', (model) => {
        expect(isKnownCacheType(model)).toBe(false);
    });
});

describe('cache-type taxonomy', () => {
    // The webhook posts Strapi's singular model name straight into `isKnownCacheType`, and the
    // localized/global split has to mirror `pluginOptions.i18n.localized`. Both drift silently: a
    // missing type answers 400 and invalidates nothing, a wrong split builds a tag nobody wrote.
    const cmsRoot = resolve(__dirname, '../../../../../cms/src');

    const schemaPaths: Array<{ name: string; path: string }> = [];

    const collectFrom = (root: string, nested: (name: string) => string) => {
        if (!existsSync(root)) return;

        for (const entry of readdirSync(root, { withFileTypes: true })) {
            if (!entry.isDirectory()) continue;

            const path = resolve(root, entry.name, nested(entry.name));
            if (existsSync(path)) {
                schemaPaths.push({ name: entry.name, path });
            }
        }
    };

    // Project content types (cms/src/api/<name>/content-types/<name>/schema.json)…
    collectFrom(resolve(cmsRoot, 'api'), (name) => `content-types/${name}/schema.json`);
    // …and the ones plugins contribute, such as the form builder's `built-form`.
    if (existsSync(resolve(cmsRoot, 'extensions'))) {
        for (const plugin of readdirSync(resolve(cmsRoot, 'extensions'), { withFileTypes: true })) {
            if (!plugin.isDirectory()) continue;
            collectFrom(resolve(cmsRoot, 'extensions', plugin.name, 'content-types'), () => 'schema.json');
        }
    }

    // Users, permissions and record locking are Strapi's own plumbing, never rendered on a page.
    const INTERNAL_TYPES = new Set(['user', 'open-entity']);

    const contentTypes = schemaPaths
        .filter(({ name }) => !INTERNAL_TYPES.has(name) && !SUBMISSION_MODELS.has(name))
        .sort((a, b) => a.name.localeCompare(b.name));

    const isLocalized = (path: string): boolean => {
        const schema = JSON.parse(readFileSync(path, 'utf8'));

        // Project types declare i18n under `pluginOptions`; plugin extensions under `i18n`.
        return schema?.pluginOptions?.i18n?.localized === true || schema?.i18n?.localized === true;
    };

    it.skipIf(contentTypes.length === 0)('should accept every Strapi content type as a cache type', () => {
        expect(contentTypes.filter(({ name }) => !isKnownCacheType(name)).map(({ name }) => name)).toEqual([]);
    });

    it.skipIf(contentTypes.length === 0)('should carry a locale for exactly the localized types', () => {
        const localizedInCms = contentTypes.filter(({ path }) => isLocalized(path)).map(({ name }) => name);
        const localizedInTags = contentTypes
            .filter(
                ({ name }) => isKnownCacheType(name) && buildCacheTag(name, { id: 'x', locale: 'cs' }).endsWith('-cs'),
            )
            .map(({ name }) => name);

        expect(localizedInTags).toEqual(localizedInCms);
    });
});

describe('cache logging', () => {
    // The flags are opt-in so production stays quiet, and the log prints the resolved tag rather
    // than the call arguments — that is the value which has to match on the revalidation side.
    beforeEach(() => {
        vi.spyOn(console, 'log').mockImplementation(() => undefined);
    });

    afterEach(() => {
        vi.unstubAllEnvs();
        vi.restoreAllMocks();
    });

    it('should stay silent unless the flags are on', () => {
        cacheTag('article', { id: 'a1', locale: 'cs' });
        revalidateCacheTag('article', { id: 'a1', locale: 'cs' });

        expect(console.log).not.toHaveBeenCalled();
    });

    it('should log the resolved tag when cache logs are on', () => {
        vi.stubEnv('NEXT_PUBLIC_ALLOW_CACHE_LOGS', '1');

        cacheTag('article', { id: 'a1', locale: 'cs' });

        expect(console.log).toHaveBeenCalledWith('💾 Set cache tag article-a1-cs');
    });

    it('should log the resolved tag when revalidate logs are on', () => {
        vi.stubEnv('NEXT_PUBLIC_ALLOW_REVALIDATE_LOGS', '1');

        revalidateCacheTag('article', { id: 'a1', locale: 'cs' });

        expect(console.log).toHaveBeenCalledWith('🧹 Revalidating cache tag article-a1-cs');
    });

    it('should log each locale when a localized revalidation fans out', () => {
        vi.stubEnv('NEXT_PUBLIC_ALLOW_REVALIDATE_LOGS', '1');

        revalidateCacheTag('article');

        for (const locale of config.i18n.locales) {
            expect(console.log).toHaveBeenCalledWith(`🧹 Revalidating cache tag article-${locale}`);
        }
    });

    it('should keep the two flags independent', () => {
        vi.stubEnv('NEXT_PUBLIC_ALLOW_CACHE_LOGS', '1');

        revalidateCacheTag('redirect');

        expect(console.log).not.toHaveBeenCalled();
    });
});
