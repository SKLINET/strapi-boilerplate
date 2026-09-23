import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('next/server', async (importOriginal) => {
    const actual = await importOriginal<typeof import('next/server')>();
    return {
        ...actual,
        connection: vi.fn(async () => undefined),
    };
});

vi.mock('../../../utils/cache/tag', async (importOriginal) => {
    const actual = await importOriginal<typeof import('../../../utils/cache/tag')>();
    return {
        ...actual,
        revalidateCacheTag: vi.fn(),
    };
});

vi.mock('../../../utils/cache/path', () => ({
    revalidatePath: vi.fn(),
    revalidateAll: vi.fn(),
}));

import { GET, POST } from './route';
import { revalidateCacheTag } from '../../../utils/cache/tag';
import { revalidateAll, revalidatePath } from '../../../utils/cache/path';

const SECRET = 'test-secret';

const post = (body: unknown, headers: Record<string, string> = { 'x-revalidate-secret': SECRET }) =>
    POST(
        new NextRequest('http://localhost/api/revalidate', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json', ...headers },
        }),
    );

beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('REVALIDATE_SECRET', SECRET);
    // The route waves local development through, so authorization has to be exercised as production.
    vi.stubEnv('NODE_ENV', 'production');
});

afterEach(() => {
    vi.unstubAllEnvs();
});

describe('revalidate route GET', () => {
    it('should burn both the collective and the entity tag for the locale', async () => {
        const res = await GET(
            new NextRequest('http://localhost/api/revalidate?tag=article&id=1&locale=cs&path=/o-nas', {
                headers: { 'x-revalidate-secret': SECRET },
            }),
        );

        expect(revalidateCacheTag).toHaveBeenCalledWith('article', { locale: 'cs' });
        expect(revalidateCacheTag).toHaveBeenCalledWith('article', { id: '1', locale: 'cs' });
        expect(revalidatePath).toHaveBeenCalledWith('/o-nas');
        expect(res.status).toBe(200);
    });

    it('should reject a request without the secret', async () => {
        const res = await GET(new NextRequest('http://localhost/api/revalidate?tag=article'));

        expect(res.status).toBe(401);
        expect(revalidateCacheTag).not.toHaveBeenCalled();
    });

    it('should reject a request with the wrong secret', async () => {
        const res = await GET(
            new NextRequest('http://localhost/api/revalidate?tag=article', {
                headers: { 'x-revalidate-secret': 'nope' },
            }),
        );

        expect(res.status).toBe(401);
    });

    it('should answer 400 for an unknown tag instead of pretending it worked', async () => {
        const res = await GET(
            new NextRequest('http://localhost/api/revalidate?tag=nonsense', {
                headers: { 'x-revalidate-secret': SECRET },
            }),
        );

        expect(res.status).toBe(400);
        expect(revalidateCacheTag).not.toHaveBeenCalled();
    });

    it('should ignore ?force outside local development', async () => {
        await GET(
            new NextRequest('http://localhost/api/revalidate?force=1', {
                headers: { 'x-revalidate-secret': SECRET },
            }),
        );

        expect(revalidateAll).not.toHaveBeenCalled();
    });

    it('should flush everything on ?force in local development', async () => {
        vi.stubEnv('NODE_ENV', 'development');

        const res = await GET(new NextRequest('http://localhost/api/revalidate?force=1'));

        expect(revalidateAll).toHaveBeenCalled();
        expect(res.status).toBe(200);
    });
});

describe('revalidate route POST', () => {
    it('should burn both tags from a Strapi webhook body', async () => {
        const res = await post({ model: 'page', entry: { documentId: 'abc', locale: 'cs' } });

        expect(revalidateCacheTag).toHaveBeenCalledWith('page', { locale: 'cs' });
        expect(revalidateCacheTag).toHaveBeenCalledWith('page', { id: 'abc', locale: 'cs' });
        expect(res.status).toBe(200);
    });

    it('should fall back to a locale fan-out when the payload carries none', async () => {
        await post({ model: 'article', entry: { documentId: 'a1' } });

        expect(revalidateCacheTag).toHaveBeenCalledWith('article', { locale: undefined });
        expect(revalidateCacheTag).toHaveBeenCalledWith('article', { id: 'a1', locale: undefined });
    });

    it('should acknowledge and skip a form submission model', async () => {
        const res = await post({ model: 'contact-message', entry: { documentId: 'm1' } });

        expect(res.status).toBe(200);
        expect(revalidateCacheTag).not.toHaveBeenCalled();
    });

    it('should answer 400 for an unknown model', async () => {
        const res = await post({ model: 'nonsense', entry: { documentId: 'x' } });

        expect(res.status).toBe(400);
        expect(revalidateCacheTag).not.toHaveBeenCalled();
    });

    it('should reject a webhook without the secret', async () => {
        const res = await post({ model: 'page', entry: { documentId: 'abc' } }, {});

        expect(res.status).toBe(401);
        expect(revalidateCacheTag).not.toHaveBeenCalled();
    });
});
