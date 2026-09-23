import { afterEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import sklinet from '../sklinet.config.json';

const withCroct = vi.fn((fn: unknown) => fn);

vi.mock('@croct/plug-next/proxy', () => ({
    withCroct: (fn: unknown) => withCroct(fn),
}));

import { config, proxy } from './proxy';

// Taken from the config the proxy itself reads, so rotating the password cannot silently break
// these tests the way a hard-coded pair did.
const [{ login, password }] = sklinet.auth.basic;
const VALID_BASIC = `Basic ${btoa(`${login}:${password}`)}`;

function request(url: string, headers?: HeadersInit) {
    return new NextRequest(url, { headers });
}

function isPassthrough(res: Response) {
    return res.headers.get('x-middleware-next') === '1';
}

function rewriteUrl(res: Response) {
    return res.headers.get('x-middleware-rewrite');
}

describe('proxy config', () => {
    it('should match all paths except api, next internals and favicon', () => {
        // /api/memory is opted back in so the memory report stays behind Basic Auth.
        expect(config.matcher).toEqual(['/((?!api|_next/static|_next/image|favicon.ico).*)', '/api/memory']);
    });
});

describe('proxy', () => {
    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it('should skip auth on localhost outside production', async () => {
        const res = await proxy(request('http://localhost:3000/about'));
        expect(isPassthrough(res)).toBe(true);
    });

    it('should skip auth when disable-auth is present', async () => {
        const res = await proxy(request('http://example.com/about?disable-auth=1'));
        expect(isPassthrough(res)).toBe(true);
    });

    it('should skip auth for font and pdf paths', async () => {
        expect(isPassthrough(await proxy(request('http://example.com/fonts/inter.woff2')))).toBe(true);
        expect(isPassthrough(await proxy(request('http://example.com/files/pdf/manual.pdf')))).toBe(true);
    });

    it('should skip auth in production when BASE_PATH is not a staging host', async () => {
        vi.stubEnv('NODE_ENV', 'production');
        vi.stubEnv('BASE_PATH', 'https://www.jmb-aircraft.com');
        const res = await proxy(request('http://example.com/about'));
        expect(isPassthrough(res)).toBe(true);
    });

    it('should rewrite to /api/auth when credentials are missing', async () => {
        const res = await proxy(request('http://example.com/about'));
        expect(isPassthrough(res)).toBe(false);
        expect(rewriteUrl(res)).toBe('http://example.com/api/auth');
    });

    it('should rewrite to /api/auth when credentials are invalid', async () => {
        const res = await proxy(request('http://example.com/about', { authorization: `Basic ${btoa('nope:wrong')}` }));
        expect(rewriteUrl(res)).toBe('http://example.com/api/auth');
    });

    it('should allow a valid basic-auth pair', async () => {
        const res = await proxy(request('http://example.com/about', { authorization: VALID_BASIC }));
        expect(isPassthrough(res)).toBe(true);
    });

    it('should still require auth in production on staging BASE_PATH', async () => {
        vi.stubEnv('NODE_ENV', 'production');
        vi.stubEnv('BASE_PATH', 'https://test.sklinet.com');
        const denied = await proxy(request('http://localhost:3000/about'));
        expect(rewriteUrl(denied)).toBe('http://localhost:3000/api/auth');

        const allowed = await proxy(request('http://localhost:3000/about', { authorization: VALID_BASIC }));
        expect(isPassthrough(allowed)).toBe(true);
    });
});

describe('proxy Croct wrapping', () => {
    afterEach(() => {
        vi.unstubAllEnvs();
        vi.resetModules();
    });

    it('should wrap the handler with Croct when an app id is set', async () => {
        vi.stubEnv('NEXT_PUBLIC_CROCT_APP_ID', 'app-1');
        vi.resetModules();
        withCroct.mockClear();
        await import('./proxy');
        expect(withCroct).toHaveBeenCalledOnce();
    });
});

describe('proxy without-scripts header', () => {
    afterEach(() => {
        vi.unstubAllEnvs();
    });

    // `WithoutScripts` reads the header, not the search param, so the proxy is the only place that
    // translates one into the other.
    function overriddenHeader(res: Response) {
        return res.headers.get('x-middleware-override-headers');
    }

    it('should set the header when ?withoutScripts=1 is present', async () => {
        const res = await proxy(request('http://localhost:3000/page?withoutScripts=1'));

        expect(overriddenHeader(res)).toContain('x-without-scripts');
        expect(res.headers.get('x-middleware-request-x-without-scripts')).toBe('1');
    });

    it('should not set the header for an ordinary request', async () => {
        const res = await proxy(request('http://localhost:3000/page'));

        expect(res.headers.get('x-middleware-request-x-without-scripts')).toBeNull();
    });

    it('should not set the header for any other value', async () => {
        const res = await proxy(request('http://localhost:3000/page?withoutScripts=0'));

        expect(res.headers.get('x-middleware-request-x-without-scripts')).toBeNull();
    });

    it('should pass an inbound copy of the header through', async () => {
        // Matches hyundai-cw: the proxy only ever adds the header, it does not strip one the caller
        // sent. A client can therefore opt itself out of the third-party scripts, which affects
        // nobody else — it is the same thing a script blocker would do.
        const res = await proxy(request('http://localhost:3000/page', { 'x-without-scripts': '1' }));

        expect(res.headers.get('x-middleware-request-x-without-scripts')).toBe('1');
    });
});
