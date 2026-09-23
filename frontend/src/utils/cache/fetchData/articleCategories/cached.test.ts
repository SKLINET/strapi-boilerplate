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
vi.mock('../../../../providers', () => ({ default: { articleCategory: { find: dependencies.find } } }));

import { cachedArticleCategories } from './cached';

beforeEach(() => {
    vi.clearAllMocks();
    dependencies.find.mockResolvedValue({ data: [{ documentId: 'cat-1' }], count: 3 });
});

describe('cachedArticleCategories', () => {
    it('should tag the categories collectively for the locale', async () => {
        const result = await cachedArticleCategories({ locale: 'cs', limit: 10 });

        expect(dependencies.cacheLife).toHaveBeenCalledWith('default');
        expect(dependencies.cacheTag).toHaveBeenCalledWith('article-category', { locale: 'cs' });
        expect(result).toEqual({ data: [{ documentId: 'cat-1' }], count: 3, canLoadMore: false });
    });

    it('should not write entity tags for the records, only the collective one', async () => {
        await cachedArticleCategories({ locale: 'cs', limit: 10 });

        expect(dependencies.tagBlocks).not.toHaveBeenCalled();
        expect(dependencies.cacheTag).toHaveBeenCalledExactlyOnceWith('article-category', { locale: 'cs' });
    });

    it('should clamp the page and filter out a skipped category', async () => {
        await cachedArticleCategories({ locale: 'cs', limit: 10, page: 0, skipCategoryId: 'c9' });

        expect(dependencies.find).toHaveBeenCalledWith(
            { locale: 'cs', filters: { documentId: { ne: 'c9' } }, start: 0, limit: 10 },
            { preview: false, withoutCache: true },
        );
    });

    it('should skip the cache in preview', async () => {
        await cachedArticleCategories({ locale: 'cs', limit: 10, preview: true });

        expect(dependencies.cacheLife).not.toHaveBeenCalled();
        expect(dependencies.cacheTag).not.toHaveBeenCalled();
        expect(dependencies.find).toHaveBeenCalledWith(expect.anything(), { preview: true, withoutCache: true });
    });
});
