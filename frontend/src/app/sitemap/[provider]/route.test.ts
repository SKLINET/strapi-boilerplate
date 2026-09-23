import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// The route body is a `'use cache'` scope; outside a Next build these two have no runtime.
vi.mock('next/cache', () => ({ cacheLife: vi.fn(), cacheTag: vi.fn() }));

vi.mock('../../blocks/server', () => ({
    default: {},
}));

vi.mock('../../../providers', () => ({
    default: {
        page: { getStaticPaths: vi.fn() },
        webSetting: { get: vi.fn() },
    },
}));

vi.mock('../../../utils/base/findProvider', () => ({
    findProvider: vi.fn(),
}));

vi.mock('../../../relay/createRelayEnvironment', () => ({
    createRelayEnvironment: vi.fn(() => ({})),
}));

import { findProvider } from '../../../utils/base/findProvider';
import providers from '../../../providers';
import { GET } from './route';

describe('sitemap [provider] GET', () => {
    beforeEach(() => {
        vi.stubEnv('NEXT_PUBLIC_BASE_PATH', 'https://www.example.com');
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it('should 404 when the provider is missing', async () => {
        vi.mocked(findProvider).mockReturnValue(undefined);

        const res = await GET(new Request('http://localhost/sitemap/nope.xml'), {
            params: Promise.resolve({ provider: 'nope.xml' }),
        });

        expect(res.status).toBe(404);
        expect(await res.text()).toBe('Sitemap not found');
    });

    it('should render enabled article paths', async () => {
        vi.mocked(findProvider).mockReturnValue({
            getApiKey: () => 'article',
            getStaticPaths: vi.fn(async () => [
                { params: { slug: 'hello', sitemap: { enabled: true, changeFrequency: 'daily', priority: 0.9 } } },
                { params: { slug: 'hidden', sitemap: { enabled: false } } },
            ]),
        } as any);
        vi.mocked(providers.webSetting.get).mockResolvedValue({
            articleDetailPage: { url: 'clanek/:slug' },
        } as any);

        const res = await GET(new Request('http://localhost/sitemap/article.xml'), {
            params: Promise.resolve({ provider: 'article.xml' }),
        });
        const xml = await res.text();

        expect(res.status).toBe(200);
        expect(xml).toContain('https://www.example.com/clanek/hello');
        expect(xml).toContain('<changefreq>daily</changefreq>');
        expect(xml).not.toContain('hidden');
    });
});
