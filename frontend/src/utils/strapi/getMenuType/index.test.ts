import { describe, expect, it } from 'vitest';
import { getMenuType, getMenuItemType, getMenuListType } from './index';

const app = { locale: 'cs' } as any;

describe('getMenuItemType', () => {
    it('should return null without href or anchor', () => {
        expect(getMenuItemType(null, app)).toBeNull();
        expect(
            getMenuItemType({ id: '1', label: 'X', page: null, externalUrl: null, anchor: null } as any, app),
        ).toBeNull();
    });

    it('should map a page item', () => {
        expect(
            getMenuItemType(
                {
                    id: '1',
                    label: 'About',
                    page: { documentId: 'p', title: 'About', url: 'about' },
                    externalUrl: null,
                    openInNewTab: false,
                    anchor: null,
                } as any,
                app,
            ),
        ).toEqual({
            id: '1',
            label: 'About',
            href: '/about',
            openInNewTab: false,
            anchor: null,
        });
    });
});

describe('getMenuType', () => {
    it('should return null without valid items', () => {
        expect(getMenuType(null, app)).toBeNull();
        expect(getMenuType({ documentId: 'm', title: 'Main', items: null } as any, app)).toBeNull();
        expect(
            getMenuType({ documentId: 'm', title: 'Main', items: [{ id: '1', label: 'X' }] } as any, app),
        ).toBeNull();
    });

    it('should keep menus that have at least one valid item', () => {
        expect(
            getMenuType(
                {
                    documentId: 'm',
                    title: 'Main',
                    items: [
                        { id: '1', label: 'Bad' },
                        { id: '2', label: 'About', page: { documentId: 'p', title: 'About', url: 'about' } },
                    ],
                } as any,
                app,
            ),
        ).toMatchObject({
            id: 'm',
            title: 'Main',
            items: [{ id: '2', label: 'About', href: '/about' }],
        });
    });
});

describe('getMenuListType', () => {
    it('should skip invalid menus', () => {
        expect(getMenuListType([null], app)).toEqual([]);
    });
});
