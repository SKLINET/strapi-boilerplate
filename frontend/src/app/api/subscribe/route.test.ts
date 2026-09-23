import { describe, it, expect, vi } from 'vitest';

vi.mock('../../../relay/createRelayEnvironment', () => ({
    createRelayEnvironment: vi.fn(() => ({})),
}));

const { commitMutation } = vi.hoisted(() => ({ commitMutation: vi.fn() }));

vi.mock('relay-runtime', async (importOriginal) => {
    const actual = await importOriginal<typeof import('relay-runtime')>();
    return {
        ...actual,
        graphql: () => ({ kind: 'Test' }),
        commitMutation: (...args: unknown[]) => commitMutation(...args),
    };
});

vi.mock('busboy', () => ({
    default: vi.fn(() => {
        const handlers: Record<string, (...args: unknown[]) => void> = {};
        return {
            on(event: string, cb: (...args: unknown[]) => void) {
                handlers[event] = cb;
                return this;
            },
            write() {
                handlers.field?.('email', 'a@b.cz');
                void handlers.close?.();
            },
        };
    }),
}));

import handler from './route';

describe('subscribe handler', () => {
    it('should reject non-POST methods', async () => {
        const res = { statusCode: 200, end: vi.fn() };
        await handler({ method: 'GET' } as any, res as any);

        expect(res.statusCode).toBe(405);
        expect(res.end).toHaveBeenCalledWith('Method not allowed');
    });

    it('should commit the email from busboy and send success', async () => {
        commitMutation.mockResolvedValue({});
        const res = { send: vi.fn(), end: vi.fn(), statusCode: 200 };
        const req = { method: 'POST', headers: {}, body: '', pipe: vi.fn() };

        await handler(req as any, res as any);

        await vi.waitFor(() => {
            expect(res.send).toHaveBeenCalledWith({ success: true });
        });
        expect(commitMutation).toHaveBeenCalled();
    });
});
