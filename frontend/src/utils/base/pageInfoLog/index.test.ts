import { afterEach, describe, expect, it, vi } from 'vitest';
import { pageInfoLog } from './index';

describe('pageInfoLog', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should log the page title and mapped locale', () => {
        const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
        pageInfoLog({ locale: 'cs', page: { title: 'Home' } } as any);
        expect(log.mock.calls.some((c) => c.includes('Home'))).toBe(true);
        expect(log.mock.calls.some((c) => c.some((part) => String(part).includes('Czech')))).toBe(true);
    });

    it('should label unknown locales', () => {
        const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
        pageInfoLog({ locale: 'de', page: { title: 'X' } } as any);
        expect(log.mock.calls.some((c) => c.some((part) => String(part).includes('Unknown')))).toBe(true);
    });
});
