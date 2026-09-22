import { afterEach, describe, expect, it, vi } from 'vitest';

const draftMode = vi.fn(async () => ({ isEnabled: false }));
const getBlocksProps = vi.fn();

vi.mock('next/headers', () => ({
    draftMode: () => draftMode(),
}));

vi.mock('../../../app/blocks/server', () => ({
    default: { FormBlock: { id: 'form' } },
}));

vi.mock('../../../providers', () => ({
    default: { mocked: true },
}));

vi.mock('../../../lib/blocks/getBlocksProps', () => ({
    getBlocksProps: (...args: unknown[]) => getBlocksProps(...args),
}));

import { getStaticProps } from './index';

describe('getStaticProps', () => {
    afterEach(() => {
        vi.clearAllMocks();
        draftMode.mockResolvedValue({ isEnabled: false });
    });

    it('should return page props and a clear isNotFound on a successful fetch', async () => {
        const props = { page: { title: 'Home' }, blocksPropsMap: { a: { item: { id: '1' } } } };
        getBlocksProps.mockResolvedValue({ props });

        await expect(getStaticProps({ params: { slug: ['about'] } } as any)).resolves.toEqual({
            ...props,
            isNotFound: false,
        });
        expect(getBlocksProps).toHaveBeenCalledOnce();
        expect(getBlocksProps.mock.calls[0][0]).toMatchObject({
            locale: 'cs',
            preview: false,
            params: { slug: ['about'] },
        });
        expect(getBlocksProps.mock.calls[0][2]).toMatchObject({ ComponentBlockFormBlock: { id: 'form' } });
    });

    it('should flag a missing page as not found and substitute the CMS 404 page', async () => {
        getBlocksProps
            .mockResolvedValueOnce({ props: { page: null } })
            .mockResolvedValueOnce({ props: { page: { title: '404' } } });

        await expect(getStaticProps({ params: { slug: ['missing'] } } as any)).resolves.toEqual({
            page: { title: '404' },
            isNotFound: true,
            notFoundReason: 'missing-page',
        });
        expect(getBlocksProps.mock.calls[1][0].params.slug).toEqual(['404']);
    });

    it('should report a missing detail item separately from a missing page', async () => {
        getBlocksProps
            .mockResolvedValueOnce({ props: { page: { title: 'Detail' } }, notFound: true })
            .mockResolvedValueOnce({ props: { page: { title: '404' } } });

        await expect(getStaticProps({ params: { slug: ['clanky', 'x'] } } as any)).resolves.toMatchObject({
            notFoundReason: 'missing-item',
        });
    });

    it('should report an incomplete block as its own reason', async () => {
        getBlocksProps
            .mockResolvedValueOnce({ props: { page: { title: 'Home' }, blocksPropsMap: { a: {} } } })
            .mockResolvedValueOnce({ props: { page: { title: '404' } } });

        await expect(getStaticProps({ params: { slug: ['broken'] } } as any)).resolves.toMatchObject({
            notFoundReason: 'empty-block',
        });
    });

    it('should skip the not-found check when a redirect is present', async () => {
        const props = { page: null };
        getBlocksProps.mockResolvedValue({ redirect: { destination: '/' }, props });

        await expect(getStaticProps({ params: { slug: ['old'] } } as any)).resolves.toEqual({
            ...props,
            isNotFound: false,
        });
        expect(getBlocksProps).toHaveBeenCalledOnce();
    });

    it('should let a CMS failure propagate instead of reporting it as a 404', async () => {
        // A transient Strapi error must answer 500. Turning it into a 404 would noindex a page that
        // is perfectly fine.
        getBlocksProps.mockRejectedValue(new Error('Strapi is down'));

        await expect(getStaticProps({ params: { slug: ['about'] } } as any)).rejects.toThrow('Strapi is down');
    });
});

describe('getStaticProps for the CMS system pages', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it.each([{ slug: ['404'] }, { slug: ['500'] }, { slug: ['cs', '404'] }])(
        'should not flag $slug as not found, keeping it on the long cache profile',
        async ({ slug }) => {
            // `not-found.tsx` resolves this scope during the catch-all prerender, and a route takes
            // the *minimum* cacheLife of every scope it sees — flagging it would put every page on
            // the one-minute profile.
            getBlocksProps.mockResolvedValue({ props: { page: { title: '404' }, blocksPropsMap: { a: {} } } });

            await expect(getStaticProps({ params: { slug } } as any)).resolves.toMatchObject({ isNotFound: false });
            expect(getBlocksProps).toHaveBeenCalledOnce();
        },
    );
});
