import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from './route';

describe('web-assets GET', () => {
    beforeEach(() => {
        vi.stubEnv('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME', 'demo-cloud');
    });

    afterEach(() => {
        vi.unstubAllEnvs();
        vi.unstubAllGlobals();
    });

    const context = { params: Promise.resolve({ path: ['image', 'upload', 'x.jpg'] }) };

    it('should fetch the Cloudinary url and pass through binary', async () => {
        const fetchMock = vi.fn(
            async () =>
                new Response(Buffer.from('img'), {
                    status: 200,
                    headers: { 'Content-Type': 'image/jpeg', 'Content-Length': '3' },
                }),
        );
        vi.stubGlobal('fetch', fetchMock);

        const res = await GET(new NextRequest('http://localhost/api/web-assets/image/upload/x.jpg'), context);

        expect(fetchMock).toHaveBeenCalledWith('https://res.cloudinary.com/demo-cloud/image/upload/x.jpg', {
            headers: {},
        });
        expect(res.status).toBe(200);
        expect(res.headers.get('Content-Type')).toBe('image/jpeg');
        expect(res.headers.get('Content-Encoding')).toBeNull();
    });

    it('should forward a Range header', async () => {
        const fetchMock = vi.fn(
            async () =>
                new Response(Buffer.from('img'), {
                    status: 200,
                    headers: { 'Content-Type': 'video/mp4', 'Content-Range': 'bytes 0-1/2' },
                }),
        );
        vi.stubGlobal('fetch', fetchMock);

        await GET(new NextRequest('http://localhost/api/web-assets/v.mp4', { headers: { Range: 'bytes=0-1' } }), {
            params: Promise.resolve({ path: ['v.mp4'] }),
        });

        expect(fetchMock).toHaveBeenCalledWith('https://res.cloudinary.com/demo-cloud/v.mp4', {
            headers: { Range: 'bytes=0-1' },
        });
    });

    it('should gzip json and text', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn(
                async () => new Response('{"a":1}', { status: 200, headers: { 'Content-Type': 'application/json' } }),
            ),
        );

        const res = await GET(new NextRequest('http://localhost/api/web-assets/a.json'), {
            params: Promise.resolve({ path: ['a.json'] }),
        });

        expect(res.headers.get('Content-Encoding')).toBe('gzip');
    });

    it('should echo a non-ok upstream status', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn(async () => new Response('', { status: 404 })),
        );

        const res = await GET(new NextRequest('http://localhost/api/web-assets/missing'), {
            params: Promise.resolve({ path: ['missing'] }),
        });

        expect(res.status).toBe(404);
    });

    it('should return 500 Proxy error when fetch throws', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn(async () => {
                throw new Error('offline');
            }),
        );

        const res = await GET(new NextRequest('http://localhost/api/web-assets/x'), {
            params: Promise.resolve({ path: ['x'] }),
        });

        expect(res.status).toBe(500);
        expect(await res.text()).toBe('Proxy error');
    });
});
