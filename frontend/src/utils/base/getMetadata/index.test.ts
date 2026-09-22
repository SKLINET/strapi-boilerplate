import { afterEach, describe, expect, it, vi } from 'vitest';

const draftMode = vi.fn(async () => ({ isEnabled: true }));
const getMetadataProps = vi.fn();

vi.mock('next/headers', () => ({
    draftMode: () => draftMode(),
}));

vi.mock('../../../app/blocks/server', () => ({
    default: { VideoBlock: { id: 'video' } },
}));

vi.mock('../../../providers', () => ({
    default: { mocked: true },
}));

vi.mock('../../../lib/blocks/getMetadataProps', () => ({
    getMetadataProps: (...args: unknown[]) => getMetadataProps(...args),
}));

import { getMetadata } from './index';

describe('getMetadata', () => {
    afterEach(() => {
        vi.clearAllMocks();
        draftMode.mockResolvedValue({ isEnabled: true });
    });

    it('should return metadata props and a clear isNotFound on a successful fetch', async () => {
        const props = { page: { title: 'About' }, blocksPropsMap: { a: { data: {} } } };
        getMetadataProps.mockResolvedValue({ props });

        await expect(getMetadata({ params: { slug: ['cs', 'about'] } } as any)).resolves.toEqual({
            ...props,
            isNotFound: false,
        });
        expect(getMetadataProps.mock.calls[0][0]).toMatchObject({
            locale: 'cs',
            preview: true,
            draftMode: true,
            params: { slug: ['about'] },
        });
        expect(getMetadataProps.mock.calls[0][2]).toMatchObject({ ComponentBlockVideoBlock: { id: 'video' } });
    });

    it('should load the CMS 404 metadata and flag it, so the title is right and the URL is noindexed', async () => {
        getMetadataProps
            .mockResolvedValueOnce({ notFound: true, props: { page: { title: 'x' } } })
            .mockResolvedValueOnce({ props: { page: { title: '404' } } });

        await expect(getMetadata({ params: { slug: ['gone'] } } as any)).resolves.toEqual({
            page: { title: '404' },
            isNotFound: true,
            notFoundReason: 'missing-item',
        });
        expect(getMetadataProps.mock.calls[1][0].params.slug).toEqual(['404']);
    });

    it('should report a missing page as its own reason', async () => {
        getMetadataProps
            .mockResolvedValueOnce({ props: { page: null } })
            .mockResolvedValueOnce({ props: { page: { title: '404' } } });

        await expect(getMetadata({ params: { slug: ['gone'] } } as any)).resolves.toMatchObject({
            notFoundReason: 'missing-page',
        });
    });

    it('should leave a redirect alone rather than treating it as not found', async () => {
        const props = { page: null, redirect: { to: '/nova-url' } };
        getMetadataProps.mockResolvedValue({ redirect: { destination: '/nova-url' }, props });

        await expect(getMetadata({ params: { slug: ['stara-url'] } } as any)).resolves.toEqual({
            ...props,
            isNotFound: false,
        });
        expect(getMetadataProps).toHaveBeenCalledOnce();
    });

    it('should not mark a transient CMS failure as not found', async () => {
        // Noindexing a page that merely hit an error would take a healthy URL out of search results.
        getMetadataProps.mockRejectedValue(new Error('Strapi is down'));

        await expect(getMetadata({ params: { slug: ['about'] } } as any)).resolves.toMatchObject({
            isNotFound: false,
            blocksPropsMap: {},
        });
    });
});

describe('getMetadata for the CMS system pages', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should mirror getStaticProps and leave /404 unflagged', async () => {
        getMetadataProps.mockResolvedValue({ notFound: true, props: { page: { title: '404' } } });

        await expect(getMetadata({ params: { slug: ['404'] } } as any)).resolves.toMatchObject({ isNotFound: false });
        expect(getMetadataProps).toHaveBeenCalledOnce();
    });
});
