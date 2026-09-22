// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

vi.mock('@cloudinary/url-gen', () => ({
    Cloudinary: class {
        video() {
            return {
                format() {
                    return this;
                },
                resize() {
                    return this;
                },
                toURL() {
                    return 'https://res.cloudinary.com/demo/video/upload/resized.mp4';
                },
            };
        }
    },
}));

vi.mock('@cloudinary/url-gen/actions/resize', () => ({
    fit: () => ({ width: () => ({}) }),
}));

vi.mock('../cloudinaryUrl', () => ({
    transformCloudinaryUrl: (url: string) => `proxied:${url}`,
}));

import { useVideoResize } from './index';

describe('useVideoResize', () => {
    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it('should pass through non-cloudinary urls', async () => {
        const { result } = renderHook(() => useVideoResize('https://cdn.example/a.mp4'));
        await waitFor(() => {
            expect(result.current).toBe('https://cdn.example/a.mp4');
        });
    });

    it('should resize and proxy Cloudinary urls when the cloud name is set', async () => {
        vi.stubEnv('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME', 'demo');
        Object.defineProperty(window, 'innerWidth', { value: 1400, configurable: true });

        const { result } = renderHook(() =>
            useVideoResize('https://res.cloudinary.com/demo/video/upload/v1/folder/file.mp4'),
        );

        await waitFor(() => {
            expect(result.current).toBe('proxied:https://res.cloudinary.com/demo/video/upload/resized.mp4');
        });
    });
});
