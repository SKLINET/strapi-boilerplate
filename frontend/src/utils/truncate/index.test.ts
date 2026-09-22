import { describe, it, expect } from 'vitest';
import { truncate } from './index';

describe('truncate', () => {
    it('should return empty string for falsy text', () => {
        expect(truncate('')).toBe('');
    });

    it('should return text unchanged when within maxChars plus ellipsis room', () => {
        expect(truncate('short')).toBe('short');
        expect(truncate('a'.repeat(27))).toBe('a'.repeat(27));
    });

    it('should slice to maxChars and append ellipsis when longer', () => {
        expect(truncate('a'.repeat(28))).toBe('a'.repeat(24) + '...');
        expect(truncate('abcdefghij', 4)).toBe('abcd...');
    });
});
