// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { createRef } from 'react';
import { act, renderHook } from '@testing-library/react';
import { useOnScroll } from './index';

describe('useOnScroll', () => {
    it('should call back when the trigger is already in view', () => {
        const callback = vi.fn();
        const ref = createRef<HTMLDivElement>();
        ref.current = {
            getBoundingClientRect: () => ({ top: 10 }),
        } as HTMLDivElement;

        Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
        Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });

        renderHook(() => useOnScroll(ref, 'bottom', callback));
        expect(callback).toHaveBeenCalled();
    });

    it('should not call back when the element is below the trigger', () => {
        const callback = vi.fn();
        const ref = createRef<HTMLDivElement>();
        ref.current = {
            getBoundingClientRect: () => ({ top: 5000 - window.scrollY }),
        } as HTMLDivElement;

        Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
        Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });

        renderHook(() => useOnScroll(ref, 'middle', callback));
        expect(callback).not.toHaveBeenCalled();

        act(() => {
            Object.defineProperty(window, 'scrollY', { value: 4800, configurable: true });
            window.dispatchEvent(new Event('scroll'));
        });
        expect(callback).toHaveBeenCalled();
    });
});
