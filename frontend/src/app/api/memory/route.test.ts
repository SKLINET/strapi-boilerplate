import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('next/server', () => ({ connection: vi.fn(async () => undefined) }));

import { GET } from './route';

beforeEach(() => {
    vi.restoreAllMocks();
});

describe('memory route', () => {
    it('should render the HTML report by default and forbid storing it', async () => {
        const res = await GET(new Request('http://localhost/api/memory'));

        expect(res.headers.get('Content-Type')).toBe('text/html; charset=utf-8');
        expect(res.headers.get('Cache-Control')).toBe('private, no-store');
        await expect(res.text()).resolves.toContain('<!DOCTYPE html>');
    });

    it('should return the raw snapshot with ?format=json', async () => {
        const res = await GET(new Request('http://localhost/api/memory?format=json'));
        const body = await res.json();

        expect(res.headers.get('Cache-Control')).toBe('private, no-store');
        expect(body).toMatchObject({
            rss: expect.any(Number),
            heapUsed: expect.any(Number),
            arrayBuffers: expect.any(Number),
            cacheMaxMemorySize: 50 * 1024 * 1024,
            uptimeSeconds: expect.any(Number),
        });
    });

    it('should ignore an unknown format and fall back to HTML', async () => {
        const res = await GET(new Request('http://localhost/api/memory?format=csv'));

        expect(res.headers.get('Content-Type')).toBe('text/html; charset=utf-8');
    });
});
