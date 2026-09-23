import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const httpProxyMiddleware = vi.fn();

vi.mock('../../../lib/proxy/httpProxyMiddleware', () => ({
    default: (...args: unknown[]) => httpProxyMiddleware(...args),
}));

import handler from './[...all]';

describe('assets proxy', () => {
    beforeEach(() => {
        vi.stubEnv('API_BASE_PATH', 'http://cms.test');
        httpProxyMiddleware.mockResolvedValue(undefined);
    });

    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it('should proxy uploads with asset path rewrites', async () => {
        const req = { url: '/api/assets/x' } as any;
        const res = {} as any;

        await handler(req, res);

        expect(httpProxyMiddleware).toHaveBeenCalledWith(req, res, {
            target: 'http://cms.test/uploads',
            pathRewrite: {
                '^/api/assets': '',
                '^/assets': '',
                '^/api': '',
            },
        });
    });
});
