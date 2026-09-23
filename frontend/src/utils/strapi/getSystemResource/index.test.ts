import { afterEach, describe, expect, it, vi } from 'vitest';
import { getSystemResource } from './index';

describe('getSystemResource', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should return empty string when data is missing', () => {
        expect(getSystemResource('k', null)).toBe('');
        expect(getSystemResource('k', undefined)).toBe('');
    });

    it('should return the matching value', () => {
        expect(getSystemResource('hello', [{ codename: 'hello', value: 'Ahoj' }] as any)).toBe('Ahoj');
    });

    it('should log and wrap a missing key', () => {
        const err = vi.spyOn(console, 'error').mockImplementation(() => undefined);
        expect(getSystemResource('missing', [{ codename: 'other', value: 'x' }] as any)).toBe('{missing}');
        expect(err).toHaveBeenCalledWith('Chybějící všeobecný text: ', 'missing');
    });
});
