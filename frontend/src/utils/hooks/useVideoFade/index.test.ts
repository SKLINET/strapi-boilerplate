// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useVideoFade } from './index';

describe('useVideoFade', () => {
    it('should show the video immediately when fade is disabled', () => {
        const { result } = renderHook(() => useVideoFade(false, false));
        act(() => {
            result.current.update(1, 10);
        });
        expect(result.current.show).toBe(true);
    });

    it('should hide near the end of a looping faded video', () => {
        const { result } = renderHook(() => useVideoFade(true, true));
        act(() => {
            result.current.update(2, 10);
        });
        expect(result.current.show).toBe(true);
        act(() => {
            result.current.update(9.5, 10);
        });
        expect(result.current.show).toBe(false);
    });
});
