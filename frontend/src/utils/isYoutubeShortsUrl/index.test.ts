import { describe, it, expect } from 'vitest';
import { isYoutubeShortsUrl } from './index';

describe('isYoutubeShortsUrl', () => {
    it('should return false for empty input', () => {
        expect(isYoutubeShortsUrl()).toBe(false);
        expect(isYoutubeShortsUrl(null)).toBe(false);
        expect(isYoutubeShortsUrl('')).toBe(false);
    });

    it('should detect shorts urls', () => {
        expect(isYoutubeShortsUrl('https://www.youtube.com/shorts/abc')).toBe(true);
        expect(isYoutubeShortsUrl('https://youtu.be/shorts/abc')).toBe(true);
    });

    it('should reject regular watch urls', () => {
        expect(isYoutubeShortsUrl('https://www.youtube.com/watch?v=abc')).toBe(false);
    });
});
