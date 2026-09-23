import { beforeEach, describe, expect, it, vi } from 'vitest';

const dependencies = vi.hoisted(() => ({
    cacheLife: vi.fn(),
    cacheTag: vi.fn(),
    tagBlocks: vi.fn(),
    find: vi.fn(),
}));

vi.mock('next/cache', () => ({
    cacheLife: (...args: unknown[]) => dependencies.cacheLife(...args),
    cacheTag: vi.fn(),
}));

vi.mock('../../tag', () => ({ cacheTag: (...args: unknown[]) => dependencies.cacheTag(...args) }));
vi.mock('../../page', () => ({ tagBlocks: (...args: unknown[]) => dependencies.tagBlocks(...args) }));
vi.mock('../../../../providers', () => ({ default: { article: { find: dependencies.find } } }));

import { cachedArticlesList } from './cached';

beforeEach(() => {
    vi.clearAllMocks();
    dependencies.find.mockResolvedValue({ data: [{ documentId: 'article-1' }], count: 12 });
});

describe('cachedArticlesList', () => {
    it('should tag the list collectively for the locale and forward the whole query', async () => {
        const result = await cachedArticlesList({ locale: 'cs', page: 2, limit: 6, categoryId: 'cat-1' });

        expect(dependencies.cacheLife).toHaveBeenCalledWith('default');
        expect(dependencies.cacheTag).toHaveBeenCalledWith('article', { locale: 'cs' });
        expect(dependencies.find).toHaveBeenCalledWith(
            {
                locale: 'cs',
                filters: { category: { documentId: { eq: 'cat-1' } } },
                start: 6,
                limit: 6,
            },
            { preview: false, withoutCache: true },
        );
        // 12 records in total and this page ends at offset 6 + 6, so there is no next page.
        expect(result).toEqual({ data: [{ documentId: 'article-1' }], count: 12, canLoadMore: false });
    });

    it('should not write entity tags for the records, only the collective one', async () => {
        // The list fragments do not select __typename, so per-record tags would be silently empty —
        // and one tag per record if they ever did. The collective tag covers invalidation on its own.
        await cachedArticlesList({ locale: 'cs', limit: 6 });

        expect(dependencies.tagBlocks).not.toHaveBeenCalled();
        expect(dependencies.cacheTag).toHaveBeenCalledExactlyOnceWith('article', { locale: 'cs' });
    });

    it('should report a further page when the count exceeds the window', async () => {
        dependencies.find.mockResolvedValue({ data: [], count: 30 });

        const result = await cachedArticlesList({ locale: 'cs', limit: 6 });

        expect(result.canLoadMore).toBe(true);
    });

    it('should clamp a page below 1 instead of asking Strapi for a negative offset', async () => {
        await cachedArticlesList({ locale: 'cs', limit: 6, page: 0 });

        expect(dependencies.find).toHaveBeenCalledWith(expect.objectContaining({ start: 0 }), expect.anything());
    });

    it('should prefer an explicit start over the page number', async () => {
        await cachedArticlesList({ locale: 'cs', limit: 6, page: 3, start: 4 });

        expect(dependencies.find).toHaveBeenCalledWith(expect.objectContaining({ start: 4 }), expect.anything());
    });

    it('should filter out a skipped article', async () => {
        await cachedArticlesList({ locale: 'cs', limit: 6, skipArticleId: 'a9' });

        expect(dependencies.find).toHaveBeenCalledWith(
            expect.objectContaining({ filters: { documentId: { ne: 'a9' } } }),
            expect.anything(),
        );
    });

    it('should skip the cache in preview so drafts are not stored between requests', async () => {
        await cachedArticlesList({ locale: 'cs', limit: 6, preview: true });

        expect(dependencies.cacheLife).not.toHaveBeenCalled();
        expect(dependencies.cacheTag).not.toHaveBeenCalled();
        expect(dependencies.find).toHaveBeenCalledWith(expect.anything(), { preview: true, withoutCache: true });
    });
});
