// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

const useJsApiLoader = vi.fn(() => ({ isLoaded: true }));

vi.mock('@react-google-maps/api', () => ({
    useJsApiLoader: (opts: unknown) => useJsApiLoader(opts),
}));

describe('useGoogleMapsLoader', () => {
    it('should lock the locale from the first call', async () => {
        vi.resetModules();
        useJsApiLoader.mockClear();
        const { useGoogleMapsLoader } = await import('./index');

        const first = renderHook(() => useGoogleMapsLoader('cs'));
        expect(first.result.current.isLoaded).toBe(true);
        expect(useJsApiLoader).toHaveBeenCalledWith(expect.objectContaining({ language: 'cs' }));

        const second = renderHook(() => useGoogleMapsLoader('en'));
        expect(useJsApiLoader.mock.calls.at(-1)?.[0]).toEqual(expect.objectContaining({ language: 'cs' }));
        second.unmount();
        first.unmount();
    });
});
