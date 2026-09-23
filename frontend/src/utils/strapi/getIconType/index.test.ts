import { describe, expect, it, vi } from 'vitest';

vi.mock('../../../app/components/primitives/Icon/Icon', () => ({
    getIconName: (name: string) => name,
}));

import { getIconType, getIconListType } from './index';

describe('getIconType', () => {
    it('should return null without a codename', () => {
        expect(getIconType(null)).toBeNull();
        expect(getIconType({} as any)).toBeNull();
    });

    it('should map codename through getIconName', () => {
        expect(getIconType({ codename: 'alert' } as any)).toBe('alert');
    });
});

describe('getIconListType', () => {
    it('should skip entries without a codename', () => {
        expect(getIconListType([null, { codename: 'play' }, {}] as any)).toEqual(['play']);
    });
});
