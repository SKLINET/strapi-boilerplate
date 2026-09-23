import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const { enable, disable, toPromise } = vi.hoisted(() => ({
    enable: vi.fn(),
    disable: vi.fn(),
    toPromise: vi.fn(),
}));

vi.mock('next/headers', () => ({
    draftMode: vi.fn(async () => ({ enable, disable })),
}));

vi.mock('../../../relay/createRelayEnvironment', () => ({
    createRelayEnvironment: vi.fn(() => ({})),
}));

vi.mock('relay-runtime', async (importOriginal) => {
    const actual = await importOriginal<typeof import('relay-runtime')>();
    return {
        ...actual,
        graphql: () => ({ kind: 'Test' }),
        fetchQuery: vi.fn(() => ({ toPromise })),
    };
});

import { GET } from './route';

describe('preview GET', () => {
    beforeEach(() => {
        vi.stubEnv('PREVIEW_SECRET', 'preview-secret');
        vi.stubEnv('NEXT_PUBLIC_BASE_PATH', 'http://localhost:3000');
        enable.mockClear();
        disable.mockClear();
        toPromise.mockResolvedValue({
            webSetting: {
                homePage: { url: 'homepage' },
                articleDetailPage: { url: 'articles/:slug' },
            },
        });
    });

    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it('should reject an invalid secret', async () => {
        const res = await GET(new Request('http://localhost/api/preview?secret=nope'));
        expect(res.status).toBe(401);
        expect(await res.text()).toBe('Invalid token');
    });

    it('should enable draft mode and redirect for a draft article', async () => {
        const res = await GET(
            new Request(
                'http://localhost/api/preview?secret=preview-secret&type=api::article.article&slug=hello&locale=cs',
            ),
        );

        expect(enable).toHaveBeenCalled();
        expect(disable).not.toHaveBeenCalled();
        expect(res.status).toBe(307);
        expect(res.headers.get('location')).toBe('http://localhost:3000/articles/hello');
    });

    it('should disable draft mode when status is PUBLISHED', async () => {
        await GET(new Request('http://localhost/api/preview?secret=preview-secret&status=published'));

        expect(disable).toHaveBeenCalled();
        expect(enable).not.toHaveBeenCalled();
    });
});
