import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('@elastic/elasticsearch', () => ({
    Client: vi.fn(function Client(this: { options: unknown }, options: unknown) {
        this.options = options;
    }),
}));

describe('getElastic', () => {
    beforeEach(() => {
        vi.resetModules();
        vi.stubEnv('ELASTIC_URL', 'http://elastic.test');
        vi.stubEnv('ELASTIC_API_KEY_ID', 'key-id');
        vi.stubEnv('ELASTIC_API_KEY', 'key-secret');
    });

    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it('should construct a Client from stubbed env and reuse the singleton', async () => {
        const { Client } = await import('@elastic/elasticsearch');
        const { default: getElastic } = await import('./index');

        const first = getElastic();
        const second = getElastic();

        expect(first).toBe(second);
        expect(Client).toHaveBeenCalledTimes(1);
        expect(Client).toHaveBeenCalledWith({
            node: 'http://elastic.test',
            auth: {
                apiKey: {
                    id: 'key-id',
                    api_key: 'key-secret',
                },
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
    });
});
