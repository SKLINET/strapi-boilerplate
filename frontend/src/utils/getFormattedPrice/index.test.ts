import { describe, it, expect } from 'vitest';
import { getFormattedPrice } from './index';

describe('getFormattedPrice', () => {
    it('should insert a space every three digits from the right', () => {
        expect(getFormattedPrice(1000)).toBe('1 000');
        expect(getFormattedPrice(1234)).toBe('1 234');
        expect(getFormattedPrice(1000000)).toBe('1 000 000');
    });

    it('should leave numbers shorter than four digits unchanged', () => {
        expect(getFormattedPrice(0)).toBe('0');
        expect(getFormattedPrice(12)).toBe('12');
        expect(getFormattedPrice(123)).toBe('123');
    });

    it('should keep a decimal point without grouping the fractional part as thousands', () => {
        expect(getFormattedPrice(1234.56)).toBe('1 234 .56');
    });
});
