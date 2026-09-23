// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { createRef } from 'react';
import { act, renderHook } from '@testing-library/react';
import { useOutsideClick } from './index';

describe('useOutsideClick', () => {
    it('should call back for clicks outside the ref', () => {
        const callback = vi.fn();
        const inside = document.createElement('div');
        const extra = document.createElement('div');
        document.body.append(inside, extra);

        const ref = createRef<HTMLElement>();
        const additionRef = createRef<HTMLElement>();
        ref.current = inside;
        additionRef.current = extra;

        renderHook(() => useOutsideClick(ref, additionRef, callback));

        act(() => {
            document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(callback).toHaveBeenCalled();
    });

    it('should ignore clicks on the additional ref', () => {
        const callback = vi.fn();
        const inside = document.createElement('div');
        const extra = document.createElement('div');
        document.body.append(inside, extra);

        const ref = createRef<HTMLElement>();
        const additionRef = createRef<HTMLElement>();
        ref.current = inside;
        additionRef.current = extra;

        renderHook(() => useOutsideClick(ref, additionRef, callback));

        act(() => {
            extra.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(callback).not.toHaveBeenCalled();
    });
});
