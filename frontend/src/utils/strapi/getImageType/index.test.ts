import { describe, expect, it } from 'vitest';
import { getImageType, getImageListType } from './index';

const image = {
    documentId: 'i1',
    url: 'https://cdn.example/a.jpg',
    alternativeText: 'alt',
    width: 10,
    height: 20,
};

describe('getImageType', () => {
    it('should return null for missing input', () => {
        expect(getImageType(null)).toBeNull();
        expect(getImageType(undefined)).toBeNull();
    });

    it('should map image fields and default empty alt/size', () => {
        expect(getImageType(image as any)).toEqual({
            id: 'i1',
            url: 'https://cdn.example/a.jpg',
            width: 10,
            height: 20,
            alternativeText: 'alt',
        });
        expect(getImageType({ documentId: 'i2', url: 'https://cdn.example/b.jpg' } as any)).toEqual({
            id: 'i2',
            url: 'https://cdn.example/b.jpg',
            width: 0,
            height: 0,
            alternativeText: '',
        });
    });
});

describe('getImageListType', () => {
    it('should skip null entries', () => {
        expect(getImageListType([null, image, undefined] as any)).toHaveLength(1);
        expect(getImageListType(null)).toEqual([]);
    });
});
