import { beforeEach, describe, expect, it, vi } from 'vitest';

const dependencies = vi.hoisted(() => ({
    appRedirectQuery: { operation: 'app-redirect' },
    cacheLife: vi.fn(),
    cacheTag: vi.fn(),
    createRelayEnvironment: vi.fn(() => ({ kind: 'relay-environment' })),
    fetchQuery: vi.fn(),
    metadataGlobalQuery: { operation: 'metadata-global' },
}));

vi.mock('next/cache', () => ({
    cacheLife: (...args: unknown[]) => dependencies.cacheLife(...args),
    cacheTag: vi.fn(),
}));

vi.mock('relay-runtime', () => ({ fetchQuery: dependencies.fetchQuery }));

vi.mock('../../../relay/createRelayEnvironment', () => ({
    createRelayEnvironment: dependencies.createRelayEnvironment,
}));

vi.mock('../../../relay/metadata', () => ({ MetadataGlobalQuery: dependencies.metadataGlobalQuery }));
vi.mock('../../../relay/app', () => ({ AppRedirectQuery: dependencies.appRedirectQuery }));

vi.mock('../tag', async () => {
    const actual = await vi.importActual<typeof import('../tag')>('../tag');
    return {
        ...actual,
        cacheTag: (...args: unknown[]) => dependencies.cacheTag(...args),
    };
});

import { cachedAppRedirect, cachedGlobalMetadata } from './index';

function queryResult(data: unknown) {
    return { toPromise: vi.fn().mockResolvedValue(data) };
}

beforeEach(() => {
    vi.clearAllMocks();
    dependencies.createRelayEnvironment.mockReturnValue({ kind: 'relay-environment' });
});

describe('cachedGlobalMetadata', () => {
    it('should tag the collective web setting before the query, so an empty result is still invalidatable', async () => {
        dependencies.fetchQuery.mockReturnValue(queryResult({ webSetting: null }));

        await cachedGlobalMetadata('cs');

        expect(dependencies.cacheLife).toHaveBeenCalledWith('default');
        expect(dependencies.cacheTag).toHaveBeenCalledWith('web-setting', { locale: 'cs' });
    });

    it('should add the entity tag once the documentId is known', async () => {
        dependencies.fetchQuery.mockReturnValue(queryResult({ webSetting: { documentId: 'ws-1' } }));

        await cachedGlobalMetadata('cs');

        expect(dependencies.cacheTag).toHaveBeenCalledWith('web-setting', { id: 'ws-1', locale: 'cs' });
    });

    it('should read in the published state and pass the tag down to the fetch cache', async () => {
        dependencies.fetchQuery.mockReturnValue(queryResult({ webSetting: { documentId: 'ws-1' } }));

        await cachedGlobalMetadata('cs');

        expect(dependencies.createRelayEnvironment).toHaveBeenCalledWith(
            {},
            { preview: false, tags: ['web-setting-cs'] },
        );
        expect(dependencies.fetchQuery).toHaveBeenCalledWith(
            { kind: 'relay-environment' },
            dependencies.metadataGlobalQuery,
            { locale: 'cs', status: 'PUBLISHED' },
        );
    });
});

describe('cachedAppRedirect', () => {
    it('should tag the whole redirect table, since any redirect publish can change a lookup', async () => {
        dependencies.fetchQuery.mockReturnValue(queryResult({ redirect: null }));

        await cachedAppRedirect('/stara-url');

        expect(dependencies.cacheLife).toHaveBeenCalledWith('default');
        expect(dependencies.cacheTag).toHaveBeenCalledWith('redirect');
        expect(dependencies.createRelayEnvironment).toHaveBeenCalledWith({}, { preview: false, tags: ['redirect'] });
    });

    it('should key the lookup by the incoming path', async () => {
        dependencies.fetchQuery.mockReturnValue(queryResult({ redirect: { to: '/nova-url' } }));

        const result = await cachedAppRedirect('/stara-url');

        expect(dependencies.fetchQuery).toHaveBeenCalledWith(
            { kind: 'relay-environment' },
            dependencies.appRedirectQuery,
            { redirect: '/stara-url', status: 'PUBLISHED' },
        );
        expect(result).toEqual({ redirect: { to: '/nova-url' } });
    });
});
