import { describe, it, expect } from 'vitest';
import { getPagePattern } from './getPagePattern';

describe('getPagePattern', () => {
    it('should return homepage pattern for empty slug', () => {
        expect(getPagePattern([])).toBe('^homepage$');
        expect(getPagePattern('')).toBe('^homepage$');
    });

    it('should wrap a string slug', () => {
        expect(getPagePattern('about')).toBe('^about$');
    });

    it('should join a single-segment array without dynamic alternatives', () => {
        expect(getPagePattern(['about'])).toBe('^about$');
    });

    it('should add dynamic and catch-all alternatives for multi-segment slugs', () => {
        expect(getPagePattern(['news', 'hello'])).toBe(
            '^news\\/hello$|^news\\/:([^/]+?)$|^news/hello/\\*$|^news/\\.*$',
        );
    });
});
