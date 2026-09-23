import { describe, it, expect } from 'vitest';
import { getFormattedPhoneNumber } from './index';

describe('getFormattedPhoneNumber', () => {
    it('should strip parentheses and spaces', () => {
        expect(getFormattedPhoneNumber('+420 123 456 789')).toBe('+420123456789');
        expect(getFormattedPhoneNumber('(123) 456')).toBe('123456');
    });
});
