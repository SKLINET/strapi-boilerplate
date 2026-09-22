import { describe, it, expect } from 'vitest';
import { getReadingTime } from './index';

describe('getReadingTime', () => {
    it('should return at least 1 minute for empty or short text', () => {
        expect(getReadingTime('')).toBe(1);
        expect(getReadingTime('   ')).toBe(1);
        expect(getReadingTime('hello')).toBe(1);
    });

    it('should strip HTML before counting words', () => {
        const html = `<p>${Array.from({ length: 225 }, () => 'word').join(' ')}</p>`;
        expect(getReadingTime(html)).toBe(1);
    });

    it('should round up to the next minute at 225 wpm', () => {
        const text = Array.from({ length: 226 }, () => 'word').join(' ');
        expect(getReadingTime(text)).toBe(2);
    });
});
