import { describe, expect, it } from 'vitest';
import { getButtonType, getButtonListType } from './index';

const app = { locale: 'cs' } as any;

describe('getButtonType', () => {
    it('should return null without href or anchor', () => {
        expect(getButtonType(null, app)).toBeNull();
        expect(
            getButtonType({ id: '1', label: 'X', page: null, linkExternal: null, anchor: null } as any, app),
        ).toBeNull();
    });

    it('should prefer page href over an external link', () => {
        expect(
            getButtonType(
                {
                    id: '1',
                    label: 'Go',
                    page: { documentId: 'p', title: 'About', url: 'about' },
                    linkExternal: 'https://ext.test',
                    openInNewTab: true,
                    anchor: null,
                } as any,
                app,
            ),
        ).toEqual({
            id: '1',
            label: 'Go',
            href: '/about',
            openInNewTab: true,
            anchor: null,
        });
    });

    it('should keep an anchor-only button', () => {
        expect(
            getButtonType({ id: '2', label: 'Jump', page: null, linkExternal: null, anchor: 'section' } as any, app),
        ).toEqual({
            id: '2',
            label: 'Jump',
            href: null,
            openInNewTab: false,
            anchor: 'section',
        });
    });
});

describe('getButtonListType', () => {
    it('should skip invalid buttons', () => {
        expect(
            getButtonListType(
                [null, { id: '1', label: 'A', linkExternal: 'https://a.test', page: null, anchor: null }],
                app,
            ) as any,
        ).toHaveLength(1);
    });
});
