import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const headers = vi.fn();

vi.mock('next/headers', () => ({
    headers: () => headers(),
}));

import { WithoutScripts } from './WithoutScripts';

beforeEach(() => {
    headers.mockReset();
});

describe('WithoutScripts', () => {
    it('should render children when the without-scripts header is absent', async () => {
        headers.mockResolvedValue({ get: () => null });

        const html = renderToStaticMarkup(await WithoutScripts({ children: <script id="Cookiebot" /> }));

        expect(html).toContain('id="Cookiebot"');
    });

    it('should render nothing when the without-scripts header is set', async () => {
        headers.mockResolvedValue({ get: (name: string) => (name === 'x-without-scripts' ? '1' : null) });

        const html = renderToStaticMarkup(await WithoutScripts({ children: <script id="Cookiebot" /> }));

        expect(html).toBe('');
    });

    it('should ignore any other value of the header', async () => {
        headers.mockResolvedValue({ get: (name: string) => (name === 'x-without-scripts' ? '0' : null) });

        const html = renderToStaticMarkup(await WithoutScripts({ children: <script id="Cookiebot" /> }));

        expect(html).toContain('id="Cookiebot"');
    });
});
