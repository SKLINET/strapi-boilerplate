import { describe, it, expect } from 'vitest';
import { GET } from './route';

describe('auth GET', () => {
    it('should require basic authentication', async () => {
        const res = await GET();

        expect(res.status).toBe(401);
        expect(res.headers.get('WWW-Authenticate')).toBe("Basic realm='private_pages'");
        expect(await res.text()).toBe('Authentication Required!');
    });
});
