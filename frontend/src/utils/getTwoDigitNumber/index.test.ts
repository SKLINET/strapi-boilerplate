import { describe, it, expect } from 'vitest';
import { getTwoDigitNumber } from './index';

describe('getTwoDigitNumber', () => {
    it('should pad numbers 0–9', () => {
        expect(getTwoDigitNumber(0)).toBe('00');
        expect(getTwoDigitNumber(9)).toBe('09');
    });

    it('should stringify numbers greater than 9', () => {
        expect(getTwoDigitNumber(10)).toBe('10');
        expect(getTwoDigitNumber(42)).toBe('42');
    });
});
