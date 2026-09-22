import { describe, it, expect } from 'vitest';
import { countDecimals } from './index';

describe('countDecimals', () => {
    it('should return 0 for integers', () => {
        expect(countDecimals(5)).toBe(0);
        expect(countDecimals(0)).toBe(0);
    });

    it('should count digits after the decimal point', () => {
        expect(countDecimals(1.2)).toBe(1);
        expect(countDecimals(1.23)).toBe(2);
    });
});
