import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../../utils/cache/fetchData/articleCategories/cached', () => ({
    cachedArticleCategories: vi.fn(),
}));

vi.mock('../../../utils/strapi/getArticleCategoryType', () => ({
    getArticleCategoryListType: vi.fn((data: unknown) => data),
}));

import { fetchArticleCategories } from './index';
import { cachedArticleCategories } from '../../../utils/cache/fetchData/articleCategories/cached';

const app = { locale: 'cs', preview: true } as any;

describe('fetchArticleCategories', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(cachedArticleCategories).mockResolvedValue({
            data: [{ documentId: 'c1' }],
            count: 1,
            canLoadMore: false,
        } as any);
    });

    it('should delegate to the cached loader and forward locale and preview', async () => {
        const result = await fetchArticleCategories({ page: 0, limit: 3, skipCategoryId: 'c0' }, app);

        expect(cachedArticleCategories).toHaveBeenCalledWith({
            page: 0,
            limit: 3,
            skipCategoryId: 'c0',
            locale: 'cs',
            preview: true,
        });
        expect(result).toEqual({ categories: [{ documentId: 'c1' }], canLoadMore: false });
    });
});
