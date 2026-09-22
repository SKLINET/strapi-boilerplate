import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('sessionOptions', () => {
    beforeEach(() => {
        vi.resetModules();
        vi.stubEnv('SECRET_COOKIE_PASSWORD', 'password-that-is-long-enough-32ch');
    });

    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it('should expose the cookie name and password from env', async () => {
        vi.stubEnv('NODE_ENV', 'development');
        const { sessionOptions } = await import('./index');

        expect(sessionOptions.cookieName).toBe('boilerplate-session');
        expect(sessionOptions.password).toBe('password-that-is-long-enough-32ch');
        expect(sessionOptions.cookieOptions.secure).toBe(false);
    });

    it('should set secure cookies when NODE_ENV is production', async () => {
        vi.stubEnv('NODE_ENV', 'production');
        const { sessionOptions } = await import('./index');

        expect(sessionOptions.cookieOptions.secure).toBe(true);
    });
});
