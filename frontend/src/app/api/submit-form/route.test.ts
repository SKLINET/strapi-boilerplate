import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('axios', () => ({ default: vi.fn() }));

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

vi.mock('nodemailer', () => ({
    default: { createTransport: vi.fn() },
}));

import { POST } from './route';

function formRequest(formInfo: unknown, formData: unknown) {
    const body = new FormData();
    body.set('formInfo', JSON.stringify(formInfo));
    body.set('formData', JSON.stringify(formData));
    return new NextRequest('http://localhost/api/submit-form', { method: 'POST', body });
}

describe('submit-form POST', () => {
    beforeEach(() => {
        commitMutation.mockImplementation((_env, config: { onCompleted: (r: unknown) => void }) => {
            config.onCompleted({ createContactMessage: { documentId: 'msg-1' } });
        });
    });

    it('should return success when the mutation creates a message', async () => {
        const res = await POST(formRequest({ sendEmail: null, asPath: '/contact', withFiles: false }, { name: 'Jan' }));

        expect(res.status).toBe(200);
        expect(await res.json()).toEqual({
            success: true,
            data: { documentId: 'msg-1' },
        });
    });

    it('should return success false when the body cannot be parsed', async () => {
        const body = new FormData();
        const res = await POST(new NextRequest('http://localhost/api/submit-form', { method: 'POST', body }));

        expect(res.status).toBe(200);
        expect(await res.json()).toEqual({ success: false });
    });
});
