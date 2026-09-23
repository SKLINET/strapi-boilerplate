import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const httpProxyMiddleware = vi.fn();

vi.mock('../../../lib/proxy/httpProxyMiddleware', () => ({
    default: (...args: unknown[]) => httpProxyMiddleware(...args),
}));

import handler from './[...all]';

describe('files proxy', () => {
    beforeEach(() => {
        vi.stubEnv('API_BASE_PATH', 'http://cms.test');
        httpProxyMiddleware.mockResolvedValue(undefined);
    });

    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it('should proxy media with file path rewrites', async () => {
        const req = { url: '/api/files/x' } as any;
        const res = {} as any;

        await handler(req, res);

        expect(httpProxyMiddleware).toHaveBeenCalledWith(req, res, {
            target: 'http://cms.test/media',
            pathRewrite: {
                '^/api/files': '',
                '^/files': '',
                '^/api': '',
            },
        });
    });
});
