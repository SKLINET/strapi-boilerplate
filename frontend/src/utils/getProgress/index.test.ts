import { describe, it, expect } from 'vitest';
import { getProgress } from './index';

describe('getProgress', () => {
    it('should return a 0–1 ratio rounded to two decimals', () => {
        expect(getProgress(0, 100, 50)).toBe(0.5);
        expect(getProgress(0, 100, 33)).toBe(0.33);
    });

    it('should clamp below start and above end', () => {
        expect(getProgress(10, 20, 0)).toBe(0);
        expect(getProgress(10, 20, 30)).toBe(1);
    });
});
