import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../../utils/cache/fetchData/articlesList/cached', () => ({
    cachedArticlesList: vi.fn(),
}));

vi.mock('../../../utils/strapi/getArticleType', () => ({
    getArticleListType: vi.fn((data: unknown) => data),
}));

import { fetchArticles } from './index';
import { cachedArticlesList } from '../../../utils/cache/fetchData/articlesList/cached';
import { getArticleListType } from '../../../utils/strapi/getArticleType';

const app = { locale: 'cs', preview: false, webSetting: { documentId: 'ws1' } } as any;

describe('fetchArticles', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(cachedArticlesList).mockResolvedValue({
            data: [{ documentId: '1' }],
            count: 1,
            canLoadMore: false,
        } as any);
        vi.mocked(getArticleListType).mockImplementation((data) => data as any);
    });

    it('should delegate to the cached loader rather than querying Strapi itself', async () => {
        // The action is an entry point, not a cache boundary — client paging has to land on the same
        // entry the server render of the block already filled.
        await fetchArticles({ page: 2, limit: 5, categoryId: 'cat' }, app);

        expect(cachedArticlesList).toHaveBeenCalledWith({
            page: 2,
            limit: 5,
            categoryId: 'cat',
            locale: 'cs',
            preview: false,
        });
    });

    it('should forward the preview flag so drafts skip the cache', async () => {
        await fetchArticles({ limit: 5 }, { ...app, preview: true });

        expect(cachedArticlesList).toHaveBeenCalledWith(expect.objectContaining({ preview: true }));
    });

    it('should normalize above the cache boundary, keeping webSetting out of the cache key', async () => {
        const result = await fetchArticles({ limit: 5 }, app);

        expect(getArticleListType).toHaveBeenCalledWith([{ documentId: '1' }], app);
        expect(result).toEqual({ articles: [{ documentId: '1' }], canLoadMore: false });
    });

    it('should pass canLoadMore straight through from the loader', async () => {
        vi.mocked(cachedArticlesList).mockResolvedValue({ data: [], count: 99, canLoadMore: true } as any);

        await expect(fetchArticles({ limit: 5 }, app)).resolves.toMatchObject({ canLoadMore: true });
    });
});
