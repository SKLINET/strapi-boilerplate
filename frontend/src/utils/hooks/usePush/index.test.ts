// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

const push = vi.fn();
const start = vi.fn();

vi.mock('next/navigation', () => ({
    useRouter: () => ({ push }),
}));

vi.mock('nprogress', () => ({
    default: { start: () => start() },
}));

import { usePush } from './index';

describe('usePush', () => {
    it('should start nprogress and then push', () => {
        const { result } = renderHook(() => usePush());
        result.current('/next', { scroll: false });
        expect(start).toHaveBeenCalledOnce();
        expect(push).toHaveBeenCalledWith('/next', { scroll: false });
    });
});
