import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('next/server', async (importOriginal) => {
    const actual = await importOriginal<typeof import('next/server')>();
    return {
        ...actual,
        connection: vi.fn(async () => undefined),
    };
});

import { GET } from './route';

describe('download-file GET', () => {
    beforeEach(() => {
        vi.unstubAllGlobals();
    });

    it('should require a fileUrl', async () => {
        const res = await GET(new NextRequest('http://localhost/api/download-file'));
        expect(res.status).toBe(400);
        expect(await res.json()).toEqual({ error: 'File URL is required' });
    });

    it('should return 404 when the upstream fetch fails', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn(async () => new Response('', { status: 500 })),
        );

        const res = await GET(new NextRequest('http://localhost/api/download-file?fileUrl=https://files.test/a.pdf'));

        expect(res.status).toBe(404);
    });

    it('should stream the file as an attachment', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn(
                async () => new Response('pdf-bytes', { status: 200, headers: { 'content-type': 'application/pdf' } }),
            ),
        );

        const res = await GET(
            new NextRequest('http://localhost/api/download-file?fileUrl=https://files.test/doc&filename=report'),
        );

        expect(res.status).toBe(200);
        expect(res.headers.get('Content-Type')).toBe('application/pdf');
        expect(res.headers.get('Content-Disposition')).toBe('attachment; filename="report.pdf"');
        expect(await res.text()).toBe('pdf-bytes');
    });
});
