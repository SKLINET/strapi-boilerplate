import { describe, it, expect } from 'vitest';
import { nbsp } from './index';

describe('nbsp', () => {
    it('should return empty string for nullish input', () => {
        expect(nbsp(null)).toBe('');
        expect(nbsp(undefined)).toBe('');
    });

    it('should replace spaces in short token sequences with nbsp', () => {
        expect(nbsp('a b')).toBe('a\u00A0b');
    });

    it('should put nbsp before percent', () => {
        expect(nbsp('10 %')).toBe('10\u00A0%');
    });

    it('should replace hyphens with non-breaking hyphens', () => {
        expect(nbsp('a-b')).toBe('a‑b');
    });
});
