import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../../utils/base/getSlug', () => ({
    getNormalizedSlug: vi.fn(() => 'about'),
}));

vi.mock('../getBlocksPropsPromises', () => ({
    getBlocksPropsPromises: vi.fn(() => ({})),
}));

import { getMetadataProps } from './index';
import { getBlocksPropsPromises } from '../getBlocksPropsPromises';

const ssg = { staticGeneration: false, revalidate: 60 };

describe('getMetadataProps', () => {
    const getPageMetadata = vi.fn();
    const providers = { page: { getPageMetadata } } as any;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return notFound when metadata is missing', async () => {
        getPageMetadata.mockResolvedValue(null);

        const result = await getMetadataProps(
            { locale: 'cs', params: { slug: ['missing'] }, preview: false } as any,
            providers,
            {},
            ssg,
        );

        expect(result.notFound).toBe(true);
        expect(result.props).toEqual({ locale: 'cs', preview: false });
        expect(getBlocksPropsPromises).not.toHaveBeenCalled();
    });

    it('should return a redirect when to and permanent are set', async () => {
        getPageMetadata.mockResolvedValue({
            redirect: { to: '/new', permanent: true },
            page: null,
            webSetting: {},
        });

        const result = await getMetadataProps(
            { locale: 'cs', params: { slug: ['old'] }, preview: false } as any,
            providers,
            {},
            ssg,
        );

        expect(result.redirect).toEqual({ destination: '/new', permanent: true });
        expect(result.props.blocksPropsMap).toEqual({});
        expect(getBlocksPropsPromises).not.toHaveBeenCalled();
    });

    it('should merge block props when the page exists', async () => {
        getPageMetadata.mockResolvedValue({ page: { documentId: '1' }, webSetting: { id: 'ws' } });
        vi.mocked(getBlocksPropsPromises).mockReturnValue({ blockA: Promise.resolve({ n: 1 }) } as any);

        const result = await getMetadataProps(
            { locale: 'cs', params: { slug: ['about'] }, preview: true } as any,
            providers,
            { FakeBlock: {} } as any,
            ssg,
        );

        expect(result.notFound).toBeUndefined();
        expect(result.props.preview).toBe(true);
        expect(result.props.blocksPropsMap).toEqual({ blockA: { n: 1 } });
        expect(result.revalidate).toBe(60);
    });

    it('should return empty blocksPropsMap and notFound on ENOENT', async () => {
        getPageMetadata.mockResolvedValue({ page: { documentId: '1' }, webSetting: {} });
        const err = Object.assign(new Error('missing'), { code: 'ENOENT' });
        vi.mocked(getBlocksPropsPromises).mockReturnValue({
            blockA: Promise.reject(err),
        } as any);

        const result = await getMetadataProps(
            { locale: 'cs', params: { slug: ['about'] }, preview: false } as any,
            providers,
            {},
            ssg,
        );

        expect(result.notFound).toBe(true);
        expect(result.props.blocksPropsMap).toEqual({});
    });

    it('should rethrow errors other than ENOENT', async () => {
        getPageMetadata.mockResolvedValue({ page: { documentId: '1' }, webSetting: {} });
        vi.mocked(getBlocksPropsPromises).mockReturnValue({
            blockA: Promise.reject(new Error('boom')),
        } as any);

        await expect(
            getMetadataProps({ locale: 'cs', params: { slug: ['about'] }, preview: false } as any, providers, {}, ssg),
        ).rejects.toThrow('boom');
    });
});
