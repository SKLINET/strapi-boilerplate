import { describe, it, expect, vi, afterEach } from 'vitest';
import robots from './robots';

describe('robots', () => {
    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it('should allow indexing in production on a real host', () => {
        vi.stubEnv('NODE_ENV', 'production');
        vi.stubEnv('NEXT_PUBLIC_BASE_PATH', 'https://www.jmbaircraft.com');

        expect(robots()).toEqual({
            rules: {
                userAgent: '*',
                allow: ['/', '/api/sitemap'],
                disallow: '/api/',
            },
            sitemap: 'https://www.jmbaircraft.com/sitemap.xml',
        });
    });

    it('should disallow indexing on staging hosts', () => {
        vi.stubEnv('NODE_ENV', 'production');
        vi.stubEnv('NEXT_PUBLIC_BASE_PATH', 'https://jmb.beneficiotest.cz');

        expect(robots()).toEqual({
            rules: {
                userAgent: '*',
                disallow: '/',
            },
        });
    });

    it('should disallow indexing outside production', () => {
        vi.stubEnv('NODE_ENV', 'development');
        vi.stubEnv('NEXT_PUBLIC_BASE_PATH', 'https://www.jmbaircraft.com');

        expect(robots()).toEqual({
            rules: {
                userAgent: '*',
                disallow: '/',
            },
        });
    });
});
