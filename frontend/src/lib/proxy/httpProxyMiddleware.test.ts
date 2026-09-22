import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextApiRequest, NextApiResponse } from 'next';

const { chain } = vi.hoisted(() => {
    const chain = {
        once: vi.fn(),
        web: vi.fn(),
    };
    chain.once.mockImplementation((event: string, cb: (...args: unknown[]) => void) => {
        if (event === 'proxyRes') {
            queueMicrotask(() => cb({}));
        }
        return chain;
    });
    return { chain };
});

vi.mock('http-proxy', () => ({
    default: {
        createProxy: vi.fn(() => chain),
    },
}));

import httpProxyMiddleware, { rewritePath } from './httpProxyMiddleware';

describe('rewritePath', () => {
    it('should replace the first matching pattern', () => {
        expect(rewritePath('/api/assets/foo.jpg', { '^/api/assets': '', '^/api': '' })).toBe('/foo.jpg');
    });

    it('should return the original url when nothing matches', () => {
        expect(rewritePath('/keep', { '^/api': '' })).toBe('/keep');
    });
});

describe('httpProxyMiddleware', () => {
    beforeEach(() => {
        chain.once.mockClear();
        chain.web.mockClear();
    });

    it('should rewrite the request url and proxy with the given target', async () => {
        const req = { url: '/api/assets/x', method: 'GET' } as NextApiRequest;
        const res = {} as NextApiResponse;

        await httpProxyMiddleware(req, res, {
            target: 'http://cms.test/uploads',
            pathRewrite: { '^/api/assets': '' },
        });

        expect(req.url).toBe('/x');
        expect(chain.web).toHaveBeenCalledWith(req, res, {
            changeOrigin: true,
            target: 'http://cms.test/uploads',
            pathRewrite: { '^/api/assets': '' },
        });
    });
});
