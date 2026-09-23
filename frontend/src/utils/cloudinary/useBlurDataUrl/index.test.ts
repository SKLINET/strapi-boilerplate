// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

vi.mock('../cloudinaryUrl', () => ({
    transformCloudinaryUrl: (url: string) => `proxied:${url}`,
}));

vi.mock('../../getImageUrl', () => ({
    getImageUrl: (url: string) => url,
}));

import { useBlurDataUrl } from './index';

describe('useBlurDataUrl', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
        vi.restoreAllMocks();
    });

    it('should keep the grey placeholder when blur is not allowed', () => {
        const { result } = renderHook(() =>
            useBlurDataUrl({
                image: { id: '1', url: 'https://res.cloudinary.com/demo/image/upload/v1/a.jpg' } as any,
                allow: false,
            }),
        );
        expect(result.current.startsWith('data:image/webp;base64,')).toBe(true);
    });

    it('should fetch and encode a Cloudinary blur url', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn(async () => ({
                arrayBuffer: async () => new Uint8Array([1, 2, 3]).buffer,
            })),
        );

        const { result } = renderHook(() =>
            useBlurDataUrl({
                image: { id: '1', url: 'https://res.cloudinary.com/demo/image/upload/v1/a.jpg' } as any,
                allow: true,
            }),
        );

        await waitFor(() => {
            expect(result.current).toBe(`data:image/webp;base64,${Buffer.from([1, 2, 3]).toString('base64')}`);
        });
        expect(fetch).toHaveBeenCalledWith(
            'proxied:https://res.cloudinary.com/demo/image/upload/f_auto/fl_lossy/w_50/dpr_auto/q_10/v1/a.jpg',
        );
    });
});
