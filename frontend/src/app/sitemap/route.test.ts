import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// The route body is a  scope; outside a Next build these two have no runtime.
vi.mock('next/cache', () => ({ cacheLife: vi.fn(), cacheTag: vi.fn() }));

vi.mock('../../providers', () => ({
    default: {
        article: { getApiKey: () => 'article', isSitemapEnabled: () => true },
        page: { getApiKey: () => 'page', isSitemapEnabled: () => false },
        webSetting: {},
    },
}));

import { GET } from './route';

describe('sitemap index GET', () => {
    beforeEach(() => {
        vi.stubEnv('NEXT_PUBLIC_BASE_PATH', 'https://www.example.com');
    });

    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it('should list only providers with sitemap enabled', async () => {
        const res = await GET({} as any);
        const xml = await res.text();

        expect(res.status).toBe(200);
        expect(res.headers.get('Content-Type')).toContain('application/xml');
        expect(xml).toContain('https://www.example.com/sitemap/article.xml');
        expect(xml).not.toContain('/sitemap/page.xml');
    });
});
