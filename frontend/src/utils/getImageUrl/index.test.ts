import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('../cloudinary/cloudinaryUrl', () => ({
    transformCloudinaryUrl: (url: string) => `proxied:${url}`,
}));

import { getImageUrl } from './index';

describe('getImageUrl', () => {
    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it('should return empty string for missing url', () => {
        expect(getImageUrl(null)).toBe('');
        expect(getImageUrl(undefined)).toBe('');
    });

    it('should proxy Cloudinary and web-assets urls', () => {
        expect(getImageUrl('https://res.cloudinary.com/demo/image/upload/v1/a.jpg')).toBe(
            'proxied:https://res.cloudinary.com/demo/image/upload/v1/a.jpg',
        );
        expect(getImageUrl('https://example.com/web-assets/upload/v1/a.jpg')).toBe(
            'proxied:https://example.com/web-assets/upload/v1/a.jpg',
        );
    });

    it('should inject small-resolution transforms when requested', () => {
        const src = 'https://res.cloudinary.com/demo/image/upload/v1/a.jpg';
        expect(getImageUrl(src, true)).toBe(
            'proxied:https://res.cloudinary.com/demo/image/upload/f_avif,f_webp,f_jpg/fl_lossy/w_1200/dpr_auto/q_75/v1/a.jpg',
        );
    });

    it('should return the original url when smallResolution cannot split on upload', () => {
        expect(getImageUrl('https://example.com/web-assets/no-marker.jpg', true)).toBe(
            'https://example.com/web-assets/no-marker.jpg',
        );
    });

    it('should pass through other http urls', () => {
        expect(getImageUrl('https://cdn.example/photo.jpg')).toBe('https://cdn.example/photo.jpg');
    });

    it('should prefix Strapi and other relative paths with the API base', () => {
        vi.stubEnv('NEXT_PUBLIC_API_BASE_PATH', 'https://api.test');
        expect(getImageUrl('/uploads/a.jpg')).toBe('https://api.test/uploads/a.jpg');
        expect(getImageUrl('/other.jpg')).toBe('https://api.test/other.jpg');
    });

    it('should fall back to API_BASE_PATH when the public env is missing', () => {
        vi.stubEnv('API_BASE_PATH', 'https://api.internal');
        expect(getImageUrl('/uploads/a.jpg')).toBe('https://api.internal/uploads/a.jpg');
    });
});
