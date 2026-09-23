// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useGeolocation } from './index';

describe('useGeolocation', () => {
    it('should report when geolocation is missing', async () => {
        vi.stubGlobal('navigator', {});
        const { result } = renderHook(() => useGeolocation());
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });
        expect(result.current.error).toBe('Geolocation is not supported by this browser');
        vi.unstubAllGlobals();
    });

    it('should store coordinates on success', async () => {
        const getCurrentPosition = vi.fn((success: PositionCallback) => {
            success({ coords: { latitude: 50, longitude: 14 } } as GeolocationPosition);
        });
        vi.stubGlobal('navigator', { geolocation: { getCurrentPosition } });

        const { result } = renderHook(() => useGeolocation());
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });
        expect(result.current).toMatchObject({ latitude: 50, longitude: 14, error: null });
        vi.unstubAllGlobals();
    });

    it('should map permission denied errors', async () => {
        const getCurrentPosition = vi.fn((_s: PositionCallback, error: PositionErrorCallback) => {
            error({
                code: 1,
                PERMISSION_DENIED: 1,
                POSITION_UNAVAILABLE: 2,
                TIMEOUT: 3,
                message: 'no',
            } as GeolocationPositionError);
        });
        vi.stubGlobal('navigator', { geolocation: { getCurrentPosition } });

        const { result } = renderHook(() => useGeolocation());
        await waitFor(() => {
            expect(result.current.error).toBe('Geolocation permission denied');
        });
        vi.unstubAllGlobals();
    });
});
