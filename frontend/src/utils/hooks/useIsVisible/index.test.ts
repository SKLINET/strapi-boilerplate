// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { createRef } from 'react';
import { renderHook } from '@testing-library/react';

vi.mock('next/navigation', () => ({
    usePathname: () => '/page',
}));

import { useIsVisible } from './index';

describe('useIsVisible', () => {
    it('should become visible when the ref is already in the viewport', () => {
        const ref = createRef<HTMLDivElement>();
        ref.current = {
            getBoundingClientRect: () => ({ top: 10 }),
        } as HTMLDivElement;
        Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
        Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });

        const { result } = renderHook(() => useIsVisible(ref));
        expect(result.current.isVisible).toBe(true);
    });
});
