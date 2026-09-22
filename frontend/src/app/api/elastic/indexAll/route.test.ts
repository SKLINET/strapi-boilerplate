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

vi.mock('../../../../utils/cache/path', () => ({
    revalidateAll: vi.fn(),
}));

import AbstractElasticProvider from '../../../../lib/provider/AbstractElasticProvider';
import AbstractSingletonElasticProvider from '../../../../lib/provider/AbstractSingletonElasticProvider';
import { findProvider } from '../../../../utils/base/findProvider';
import { revalidateAll } from '../../../../utils/cache/path';
import { GET } from './route';

describe('elastic indexAll', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should deleteAndIndexAll for an elastic provider', async () => {
        const deleteAndIndexAll = vi.fn();
        const provider = Object.assign(Object.create(AbstractElasticProvider.prototype), { deleteAndIndexAll });
        vi.mocked(findProvider).mockReturnValue(provider);

        const res = await GET(new NextRequest('http://localhost/api/elastic/indexAll?typeId=article&prod=1'));

        expect(deleteAndIndexAll).toHaveBeenCalledWith(true);
        expect(revalidateAll).toHaveBeenCalled();
        expect(res.status).toBe(200);
        expect(await res.json()).toEqual({ status: 'OK' });
    });

    it('should index a singleton provider', async () => {
        const index = vi.fn();
        const provider = Object.assign(Object.create(AbstractSingletonElasticProvider.prototype), { index });
        vi.mocked(findProvider).mockReturnValue(provider);

        const res = await GET(new NextRequest('http://localhost/api/elastic/indexAll?typeId=web-setting'));

        expect(index).toHaveBeenCalledWith(false, false);
        expect(res.status).toBe(200);
    });

    it('should fail EMPTY responses because a 204 cannot carry a JSON body', async () => {
        vi.mocked(findProvider).mockReset();
        vi.mocked(findProvider).mockImplementation(() => undefined);

        const res = await GET(new NextRequest('http://localhost/api/elastic/indexAll?typeId=unknown'));

        expect(res.status).toBe(500);
        expect(await res.json()).toMatchObject({
            status: 'ERROR',
            message: 'Response constructor: Invalid response status code 204',
        });
    });

    it('should return 500 when indexing throws', async () => {
        const provider = Object.assign(Object.create(AbstractElasticProvider.prototype), {
            deleteAndIndexAll: vi.fn(async () => {
                throw new Error('index fail');
            }),
        });
        vi.mocked(findProvider).mockReturnValue(provider);

        const res = await GET(new NextRequest('http://localhost/api/elastic/indexAll?typeId=article'));

        expect(res.status).toBe(500);
        expect(await res.json()).toMatchObject({ status: 'ERROR', message: 'index fail' });
    });
});
