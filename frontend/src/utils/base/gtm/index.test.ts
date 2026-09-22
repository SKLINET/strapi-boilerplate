// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import { trackPage } from './index';

describe('trackPage', () => {
    afterEach(() => {
        delete (window as any).dataLayer;
    });

    it('should push ga.page with path segments as categories', () => {
        (window as any).dataLayer = [];
        trackPage('/cs/news/article/extra');
        expect((window as any).dataLayer).toEqual([
            {
                event: 'ga.page',
                pagePath: '/cs/news/article/extra',
                pageCategory1: 'news',
                pageCategory2: 'article',
                pageCategory3: 'extra',
                pageCategory4: '',
                pageCategory5: '',
            },
        ]);
    });

    it('should not assign window.dataLayer when it is missing', () => {
        trackPage('/only');
        expect((window as any).dataLayer).toBeUndefined();
    });
});
