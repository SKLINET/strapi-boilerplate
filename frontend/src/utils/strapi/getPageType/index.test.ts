import { describe, expect, it } from 'vitest';
import { getPageType, getPageListType } from './index';

const app = { locale: 'cs' } as any;

describe('getPageType', () => {
    it('should return null without a url', () => {
        expect(getPageType(null, app)).toBeNull();
        expect(getPageType({ documentId: '1', title: 'X' } as any, app)).toBeNull();
    });

    it('should map id, title and locale-aware href', () => {
        expect(getPageType({ documentId: '1', title: 'About', url: 'about' } as any, app)).toEqual({
            id: '1',
            title: 'About',
            href: '/about',
        });
        expect(getPageType({ documentId: '1', title: 'About', url: 'about' } as any, { locale: 'en' } as any)).toEqual({
            id: '1',
            title: 'About',
            href: '/en/about',
        });
    });
});

describe('getPageListType', () => {
    it('should skip entries without url', () => {
        expect(
            getPageListType(
                [null, { documentId: '1', title: 'A', url: 'a' }, { documentId: '2', title: 'B' }],
                app,
            ) as any,
        ).toEqual([{ id: '1', title: 'A', href: '/a' }]);
    });
});
