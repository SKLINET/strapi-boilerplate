import { describe, it, expect } from 'vitest';
import { getSlug, getNormalizedSlug } from './index';

describe('getSlug', () => {
    it('should return the last array segment or the string itself', () => {
        expect(getSlug(['a', 'b'])).toBe('b');
        expect(getSlug('about')).toBe('about');
        expect(getSlug(null)).toBeNull();
    });
});

describe('getNormalizedSlug', () => {
    it('should default to homepage when slug is empty', () => {
        expect(getNormalizedSlug(null)).toEqual(['homepage']);
        expect(getNormalizedSlug(undefined)).toEqual(['homepage']);
    });

    it('should wrap a string slug', () => {
        expect(getNormalizedSlug('about')).toEqual(['about']);
    });

    it('should strip the default locale prefix and restore homepage', () => {
        expect(getNormalizedSlug(['cs'])).toEqual(['homepage']);
        expect(getNormalizedSlug(['cs', 'about'])).toEqual(['about']);
    });

    it('should strip a secondary locale prefix and restore its homepage', () => {
        expect(getNormalizedSlug(['en'])).toEqual(['homepage-en']);
        expect(getNormalizedSlug(['en', 'about'])).toEqual(['about']);
    });

    it('should keep an unconfigured locale segment untouched', () => {
        expect(getNormalizedSlug(['de', 'about'])).toEqual(['de', 'about']);
    });
});
