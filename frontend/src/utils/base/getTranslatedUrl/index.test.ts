import { afterEach, describe, expect, it, vi } from 'vitest';
import { getTranslatedUrl } from './index';

describe('getTranslatedUrl', () => {
    afterEach(() => {
        vi.unstubAllEnvs();
        vi.unstubAllGlobals();
    });

    it('should return null on the server', () => {
        expect(getTranslatedUrl('en', { locale: 'cs' } as any)).toBeNull();
    });

    it('should prefix a non-default locale and keep the query string', () => {
        vi.stubEnv('NEXT_PUBLIC_BASE_PATH', 'https://site.test');
        vi.stubGlobal('window', { location: { search: '?q=1' } });

        expect(getTranslatedUrl('en', { page: null } as any)).toBe('https://site.test/en?q=1');
        expect(getTranslatedUrl('cs', { page: null } as any)).toBe('https://site.test?q=1');
    });

    it('should swap a translated page url', () => {
        vi.stubEnv('NEXT_PUBLIC_BASE_PATH', 'https://site.test');
        vi.stubGlobal('window', { location: { search: '' } });

        expect(
            getTranslatedUrl('en', {
                page: { localizations: [{ locale: 'en', url: 'about' }] },
            } as any),
        ).toBe('https://site.test/en/about');
    });

    it('should replace :slug from the item translation', () => {
        vi.stubEnv('NEXT_PUBLIC_BASE_PATH', 'https://site.test');
        vi.stubGlobal('window', { location: { search: '' } });

        expect(
            getTranslatedUrl('en', {
                page: { localizations: [{ locale: 'en', url: 'articles/:slug' }] },
                item: { localizations: [{ locale: 'en', slug: 'hello' }] },
            } as any),
        ).toBe('https://site.test/en/articles/hello');
    });
});
