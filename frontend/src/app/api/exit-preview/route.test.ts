import { describe, it, expect, vi } from 'vitest';

const { disable } = vi.hoisted(() => ({ disable: vi.fn() }));

vi.mock('next/headers', () => ({
    draftMode: vi.fn(async () => ({ disable })),
    headers: vi.fn(async () => ({
        get: (name: string) => (name === 'referer' ? 'http://localhost:3000/about' : null),
    })),
}));

import { GET } from './route';

describe('exit-preview GET', () => {
    it('should disable draft mode and redirect to the referer', async () => {
        const res = await GET(new Request('http://localhost/api/exit-preview'));

        expect(disable).toHaveBeenCalled();
        expect(res.status).toBe(307);
        expect(res.headers.get('location')).toBe('http://localhost:3000/about');
    });
});
