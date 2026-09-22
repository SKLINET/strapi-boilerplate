// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';

const usePathname = vi.fn(() => '/about');
const useSearchParams = vi.fn(() => new URLSearchParams('q=1'));

vi.mock('next/navigation', () => ({
    usePathname: () => usePathname(),
    useSearchParams: () => useSearchParams(),
}));

import { useAsPath } from './index';

describe('useAsPath', () => {
    beforeEach(() => {
        usePathname.mockReturnValue('/about');
        useSearchParams.mockReturnValue(new URLSearchParams('q=1'));
        window.location.hash = '';
    });

    it('should join pathname, search and hash', () => {
        window.location.hash = '#section';
        const { result } = renderHook(() => useAsPath());
        expect(result.current).toBe('/about?q=1#section');
    });

    it('should omit the query when search params are empty', () => {
        useSearchParams.mockReturnValue(new URLSearchParams());
        const { result } = renderHook(() => useAsPath());
        expect(result.current).toBe('/about');
    });

    it('should update when the hash changes', () => {
        const { result } = renderHook(() => useAsPath());
        act(() => {
            window.location.hash = '#later';
            window.dispatchEvent(new HashChangeEvent('hashchange'));
        });
        expect(result.current).toBe('/about?q=1#later');
    });
});
