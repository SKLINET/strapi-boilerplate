import { describe, it, expect } from 'vitest';
import { getLocale } from './index';

describe('getLocale', () => {
    it('should return the first slug segment when it is a known locale', () => {
        expect(getLocale(['cs', 'about'])).toBe('cs');
        expect(getLocale(['cs'])).toBe('cs');
        expect(getLocale(['en', 'about'])).toBe('en');
        expect(getLocale(['en'])).toBe('en');
    });

    it('should fall back to the default locale', () => {
        expect(getLocale(undefined)).toBe('cs');
        expect(getLocale([])).toBe('cs');
        expect(getLocale(['about'])).toBe('cs');
    });

    it('should fall back to the default locale for an unconfigured locale', () => {
        expect(getLocale(['de', 'about'])).toBe('cs');
    });
});
