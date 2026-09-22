import { beforeEach, describe, expect, it, vi } from 'vitest';

const dependencies = vi.hoisted(() => ({
    cacheLife: vi.fn(),
    draftMode: vi.fn(),
    getMetadata: vi.fn(),
    tagNotFoundPage: vi.fn(),
    tagPage: vi.fn(),
}));

vi.mock('next/cache', () => ({
    cacheLife: (...args: unknown[]) => dependencies.cacheLife(...args),
    cacheTag: vi.fn(),
}));

vi.mock('next/headers', () => ({ draftMode: () => dependencies.draftMode() }));
vi.mock('../../base/getMetadata', () => ({ getMetadata: dependencies.getMetadata }));
vi.mock('../page', () => ({
    tagNotFoundPage: dependencies.tagNotFoundPage,
    tagPage: dependencies.tagPage,
}));

import { cachedMetadata } from './index';

const metadata = {
    page: { documentId: 'page-1' },
    webSetting: { documentId: 'ws-1', globalSeo: { siteName: 'Sklinet' } },
    locale: 'cs',
    blocksPropsMap: {},
    preview: false,
    isNotFound: false,
};

beforeEach(() => {
    vi.clearAllMocks();
    dependencies.draftMode.mockResolvedValue({ isEnabled: false });
    dependencies.getMetadata.mockResolvedValue(metadata);
});

describe('cachedMetadata', () => {
    it('should tag a successful page and pass only the web setting id along', async () => {
        await cachedMetadata(['o-nas'], 'cs');

        expect(dependencies.getMetadata).toHaveBeenCalledWith({ params: { slug: ['o-nas'] } });
        expect(dependencies.cacheLife).toHaveBeenCalledWith('default');
        expect(dependencies.tagPage).toHaveBeenCalledWith({
            locale: 'cs',
            page: metadata.page,
            webSetting: { documentId: 'ws-1' },
            blocksPropsMap: {},
        });
    });

    it('should mirror the not-found handling of cachedStaticProps', async () => {
        // The two entries must agree, or the robots header would contradict the rendered page.
        dependencies.getMetadata.mockResolvedValue({ ...metadata, isNotFound: true });

        await cachedMetadata(['neexistuje'], 'cs');

        expect(dependencies.cacheLife).toHaveBeenCalledWith('minutes');
        expect(dependencies.tagNotFoundPage).toHaveBeenCalledWith('cs');
        expect(dependencies.tagPage).not.toHaveBeenCalled();
    });

    it('should skip the cache in preview', async () => {
        dependencies.draftMode.mockResolvedValue({ isEnabled: true });

        await cachedMetadata(['o-nas'], 'cs');

        expect(dependencies.cacheLife).not.toHaveBeenCalled();
        expect(dependencies.tagPage).not.toHaveBeenCalled();
    });
});
