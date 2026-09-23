import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('next/server', async (importOriginal) => {
    const actual = await importOriginal<typeof import('next/server')>();
    return {
        ...actual,
        connection: vi.fn(async () => undefined),
    };
});

vi.mock('../../../../relay/createRelayEnvironment', () => ({
    createRelayEnvironment: vi.fn(() => ({})),
}));

vi.mock('../../../../lib/elastic', () => ({
    default: vi.fn(),
}));

vi.mock('../../../../utils/base/findProvider', () => ({
    findProvider: vi.fn(),
}));

vi.mock('../../../../utils/cache/tag', async (importOriginal) => {
    const actual = await importOriginal<typeof import('../../../../utils/cache/tag')>();
    return { ...actual, revalidateCacheTag: vi.fn() };
});

import AbstractElasticProvider from '../../../../lib/provider/AbstractElasticProvider';
import { findProvider } from '../../../../utils/base/findProvider';
import { GET, POST } from './route';

function elasticProvider(methods: Record<string, unknown>) {
    return Object.assign(Object.create(AbstractElasticProvider.prototype), methods);
}

describe('elastic indexItem', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should index one item and revalidate its tag', async () => {
        const indexOne = vi.fn(async () => [{ type: 'article', id: '1', index: 'article-cs', locale: 'cs' }]);
        vi.mocked(findProvider).mockReturnValue(elasticProvider({ indexOne }) as any);

        const res = await GET(new NextRequest('http://localhost/api/elastic/indexItem?typeId=article&id=1'));
        const body = await res.json();

        expect(indexOne).toHaveBeenCalledWith('1', true);
        expect(res.status).toBe(200);
        expect(body.status).toBe('OK');
        expect(body.indexedItems).toHaveLength(1);
    });

    it('should unindex on delete', async () => {
        const unindex = vi.fn();
        vi.mocked(findProvider).mockReturnValue(elasticProvider({ unindex }) as any);

        const res = await GET(
            new NextRequest('http://localhost/api/elastic/indexItem?typeId=article&id=1&action=delete'),
        );

        expect(unindex).toHaveBeenCalledTimes(2);
        expect(await res.json()).toMatchObject({ status: 'OK' });
    });

    it('should return 500 when indexing throws inside handle', async () => {
        vi.mocked(findProvider).mockReturnValue(
            elasticProvider({
                indexOne: vi.fn(async () => {
                    throw new Error('boom');
                }),
            }) as any,
        );

        const res = await GET(new NextRequest('http://localhost/api/elastic/indexItem?typeId=article&id=1'));

        expect(res.status).toBe(500);
        expect(await res.json()).toMatchObject({ status: 'ERROR', message: 'boom' });
    });

    it('should handle built-form update then publish on POST', async () => {
        const indexOne = vi.fn(async () => [{ type: 'built-form', id: 'f1', index: 'built-form' }]);
        vi.mocked(findProvider).mockReturnValue(elasticProvider({ indexOne }) as any);

        const res = await POST(
            new NextRequest('http://localhost/api/elastic/indexItem', {
                method: 'POST',
                body: JSON.stringify({
                    model: 'built-form',
                    entry: { documentId: 'f1', locale: 'cs' },
                    event: 'entry.update',
                }),
                headers: { 'Content-Type': 'application/json' },
            }),
        );

        expect(indexOne).toHaveBeenCalledTimes(2);
        expect(res.status).toBe(200);
    });
});
