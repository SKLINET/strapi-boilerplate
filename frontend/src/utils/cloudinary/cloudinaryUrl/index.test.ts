import { afterEach, describe, expect, it, vi } from 'vitest';

describe('transformCloudinaryUrl', () => {
    afterEach(() => {
        vi.unstubAllEnvs();
        vi.resetModules();
    });

    it('should return empty string for missing url', async () => {
        const { transformCloudinaryUrl } = await import('./index');
        expect(transformCloudinaryUrl(null)).toBe('');
        expect(transformCloudinaryUrl(undefined)).toBe('');
    });

    it('should rewrite Cloudinary host to the web-assets proxy', async () => {
        vi.stubEnv('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME', 'demo');
        vi.stubEnv('NEXT_PUBLIC_BASE_PATH', 'https://site.test');
        vi.resetModules();
        const { transformCloudinaryUrl } = await import('./index');

        expect(transformCloudinaryUrl('https://res.cloudinary.com/demo/image/upload/v1/a.jpg')).toBe(
            'https://site.test/api/web-assets/image/upload/v1/a.jpg',
        );
    });

    it('should leave urls without an upload segment unchanged', async () => {
        vi.stubEnv('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME', 'demo');
        vi.stubEnv('NEXT_PUBLIC_BASE_PATH', 'https://site.test');
        vi.resetModules();
        const { transformCloudinaryUrl } = await import('./index');

        expect(transformCloudinaryUrl('https://res.cloudinary.com/demo/image/v1/a.jpg')).toBe(
            'https://res.cloudinary.com/demo/image/v1/a.jpg',
        );
        expect(transformCloudinaryUrl('https://cdn.example/a.jpg')).toBe('https://cdn.example/a.jpg');
    });
});
