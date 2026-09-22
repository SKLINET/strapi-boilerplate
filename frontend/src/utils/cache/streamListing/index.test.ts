import { beforeEach, describe, expect, it, vi } from 'vitest';

const connection = vi.fn(async () => undefined);

vi.mock('next/server', () => ({
    connection: () => connection(),
}));

import { streamListing } from './index';

beforeEach(() => {
    connection.mockClear();
});

describe('streamListing', () => {
    it('should await a connection, deferring the listing out of the route prerender', async () => {
        await streamListing();

        expect(connection).toHaveBeenCalledOnce();
    });

    it('should resolve to nothing, so callers cannot accidentally depend on a value', async () => {
        await expect(streamListing()).resolves.toBeUndefined();
    });
});
