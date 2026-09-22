// @vitest-environment jsdom
import { describe, expect, it, vi, afterEach } from 'vitest';
import { scrollToAnchor } from './index';

describe('scrollToAnchor', () => {
    afterEach(() => {
        document.body.innerHTML = '';
        vi.restoreAllMocks();
    });

    it('should do nothing when the anchor is missing', () => {
        const scroll = vi.spyOn(window, 'scroll').mockImplementation(() => undefined);
        scrollToAnchor('missing');
        expect(scroll).not.toHaveBeenCalled();
    });

    it('should center a short element', () => {
        const el = document.createElement('div');
        el.id = 'short';
        Object.defineProperty(el, 'clientHeight', { value: 40 });
        el.scrollIntoView = vi.fn();
        document.body.appendChild(el);
        Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });

        scrollToAnchor('short');
        expect(el.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' });
    });

    it('should window-scroll a tall element past the header', () => {
        const header = document.createElement('header');
        Object.defineProperty(header, 'clientHeight', { value: 80 });
        document.body.appendChild(header);

        const el = document.createElement('div');
        el.id = 'tall';
        Object.defineProperty(el, 'clientHeight', { value: 2000 });
        el.getBoundingClientRect = () => ({ top: 400 }) as DOMRect;
        document.body.appendChild(el);

        Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
        Object.defineProperty(window, 'scrollY', { value: 100, configurable: true });
        const scroll = vi.spyOn(window, 'scroll').mockImplementation(() => undefined);

        scrollToAnchor('tall', 10);
        expect(scroll).toHaveBeenCalledWith({
            top: 400 + 100 - 80 - 10,
            behavior: 'smooth',
        });
    });
});
