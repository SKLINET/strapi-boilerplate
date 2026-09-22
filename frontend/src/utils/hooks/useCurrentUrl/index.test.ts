// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

const usePathname = vi.fn(() => '/about');

vi.mock('next/navigation', () => ({
    usePathname: () => usePathname(),
}));

import { useCurrentUrl } from './index';

describe('useCurrentUrl', () => {
    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it('should start as null and then build an absolute url', async () => {
        vi.stubEnv('NEXT_PUBLIC_BASE_PATH', 'https://site.test');
        const { result } = renderHook(() => useCurrentUrl());
        await waitFor(() => {
            expect(result.current).toBe('https://site.test/about');
        });
    });
});
