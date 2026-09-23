import { describe, it, expect, vi, afterEach } from 'vitest';
import { getPageUrl } from './index';

describe('getPageUrl', () => {
    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it('should return empty string when page is missing', () => {
        expect(getPageUrl(null, 'cs')).toBe('');
        expect(getPageUrl(undefined, 'cs')).toBe('');
    });

    it('should return absolute http(s) urls unchanged', () => {
        expect(getPageUrl('https://example.com/x', 'cs')).toBe('https://example.com/x');
        expect(getPageUrl('http://example.com/x', 'en')).toBe('http://example.com/x');
    });

    it('should use default locale without a prefix', () => {
        expect(getPageUrl('/about', 'cs')).toBe('/about');
        expect(getPageUrl('about', '')).toBe('/about');
    });

    it('should prefix non-default locale', () => {
        expect(getPageUrl('/about', 'en')).toBe('/en/about');
    });

    it('should strip homepage slugs', () => {
        expect(getPageUrl('homepage', 'cs')).toBe('/');
        expect(getPageUrl('homepage-cs', 'cs')).toBe('/');
    });

    it('should prepend host when includeHost is true', () => {
        vi.stubEnv('NEXT_PUBLIC_BASE_PATH', 'https://site.test');
        expect(getPageUrl('/about', 'cs', true)).toBe('https://site.test/about');
    });
});
