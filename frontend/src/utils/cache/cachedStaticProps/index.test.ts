import { beforeEach, describe, expect, it, vi } from 'vitest';

const dependencies = vi.hoisted(() => ({
    cacheLife: vi.fn(),
    draftMode: vi.fn(),
    getStaticProps: vi.fn(),
    getItemFromPageResponse: vi.fn(),
    tagNotFoundPage: vi.fn(),
    tagPage: vi.fn(),
}));

vi.mock('next/cache', () => ({
    cacheLife: (...args: unknown[]) => dependencies.cacheLife(...args),
    cacheTag: vi.fn(),
}));

vi.mock('next/headers', () => ({ draftMode: () => dependencies.draftMode() }));

vi.mock('../../base/getStaticProps', () => ({ getStaticProps: dependencies.getStaticProps }));
vi.mock('../../base/getItemFromPageResponse', () => ({
    getItemFromPageResponse: dependencies.getItemFromPageResponse,
}));
vi.mock('../page', () => ({
    tagNotFoundPage: dependencies.tagNotFoundPage,
    tagPage: dependencies.tagPage,
}));

import { cachedStaticProps } from './index';

const pageData = {
    page: { documentId: 'page-1', url: 'o-nas', content: [] },
    webSetting: { documentId: 'ws-1' },
    locale: 'cs',
    blocksPropsMap: {},
    preview: false,
    isNotFound: false,
};

beforeEach(() => {
    vi.clearAllMocks();
    dependencies.getItemFromPageResponse.mockReturnValue(null);
    dependencies.draftMode.mockResolvedValue({ isEnabled: false });
    dependencies.getStaticProps.mockResolvedValue(pageData);
});

describe('cachedStaticProps', () => {
    it('should load page data from a scalar slug key and tag a successful page', async () => {
        dependencies.getItemFromPageResponse.mockReturnValue({ __typename: 'Article', documentId: 'a1' });

        const result = await cachedStaticProps(['o-nas'], 'cs');

        expect(dependencies.getStaticProps).toHaveBeenCalledWith({ params: { slug: ['o-nas'] } });
        expect(dependencies.cacheLife).toHaveBeenCalledWith('default');
        expect(dependencies.tagPage).toHaveBeenCalledWith(
            expect.objectContaining({ locale: 'cs', page: pageData.page, webSetting: pageData.webSetting }),
        );
        expect(dependencies.tagNotFoundPage).not.toHaveBeenCalled();
        expect(result.item).toEqual({ __typename: 'Article', documentId: 'a1' });
    });

    it('should shorten the lifetime of a 404 and tag it only with the bare page tag', async () => {
        // A URL that does not exist *yet* must not stay wrong for a year once the editor publishes it.
        dependencies.getStaticProps.mockResolvedValue({ ...pageData, isNotFound: true });

        await cachedStaticProps(['neexistuje'], 'cs');

        expect(dependencies.cacheLife).toHaveBeenCalledWith('minutes');
        expect(dependencies.tagNotFoundPage).toHaveBeenCalledWith('cs');
        expect(dependencies.tagPage).not.toHaveBeenCalled();
    });

    it('should skip the cache in preview so editors always see a fresh CMS payload', async () => {
        dependencies.draftMode.mockResolvedValue({ isEnabled: true });

        const result = await cachedStaticProps(['o-nas'], 'cs');

        expect(dependencies.cacheLife).not.toHaveBeenCalled();
        expect(dependencies.tagPage).not.toHaveBeenCalled();
        expect(dependencies.tagNotFoundPage).not.toHaveBeenCalled();
        expect(result.page).toEqual(pageData.page);
    });
});
