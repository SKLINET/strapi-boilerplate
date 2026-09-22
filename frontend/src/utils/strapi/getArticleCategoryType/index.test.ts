import { describe, expect, it } from 'vitest';
import { getArticleCategoryType, getArticleCategoryListType } from './index';

describe('getArticleCategoryType', () => {
    it('should return null for missing input', () => {
        expect(getArticleCategoryType(null)).toBeNull();
    });

    it('should map id and title', () => {
        expect(getArticleCategoryType({ documentId: 'c1', title: 'News' } as any)).toEqual({
            id: 'c1',
            title: 'News',
        });
    });
});

describe('getArticleCategoryListType', () => {
    it('should skip nulls', () => {
        expect(getArticleCategoryListType([null, { documentId: 'c1', title: 'News' }] as any)).toEqual([
            { id: 'c1', title: 'News' },
        ]);
    });
});
