import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../../utils/base/getSlug', () => ({
    getNormalizedSlug: vi.fn(() => 'about'),
}));

vi.mock('../getBlocksPropsPromises', () => ({
    getBlocksPropsPromises: vi.fn(() => ({})),
}));

import { getBlocksProps } from './index';
import { getBlocksPropsPromises } from '../getBlocksPropsPromises';

const ssg = { staticGeneration: false, revalidate: 60 };

describe('getBlocksProps', () => {
    const getPageBySlug = vi.fn();
    const providers = { page: { getPageBySlug } } as any;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return notFound when the page is missing', async () => {
        getPageBySlug.mockResolvedValue(null);

        const result = await getBlocksProps(
            { locale: 'cs', params: { slug: ['missing'] }, preview: false } as any,
            providers,
            {},
            ssg,
        );

        expect(result.notFound).toBe(true);
        expect(result.props).toEqual({ locale: 'cs', preview: false });
        expect(getBlocksPropsPromises).not.toHaveBeenCalled();
    });

    it('should use defaultLocale when locale is missing', async () => {
        getPageBySlug.mockResolvedValue(null);

        const result = await getBlocksProps(
            { defaultLocale: 'en', params: {}, preview: false } as any,
            providers,
            {},
            ssg,
        );

        expect(result.props.locale).toBe('en');
        expect(getPageBySlug).toHaveBeenCalledWith('en', 'about', false);
    });

    it('should merge block props when the page exists', async () => {
        getPageBySlug.mockResolvedValue({ page: { documentId: '1' }, webSetting: { id: 'ws' } });
        vi.mocked(getBlocksPropsPromises).mockReturnValue({ blockA: Promise.resolve({ n: 1 }) } as any);

        const result = await getBlocksProps(
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

    it('should disable revalidate when staticGeneration is true', async () => {
        getPageBySlug.mockResolvedValue(null);

        const result = await getBlocksProps(
            { locale: 'cs', params: {}, preview: false } as any,
            providers,
            {},
            {
                staticGeneration: true,
                revalidate: 60,
            },
        );

        expect(result.revalidate).toBe(false);
    });

    it('should return empty blocksPropsMap and notFound on ENOENT', async () => {
        getPageBySlug.mockResolvedValue({ page: { documentId: '1' }, webSetting: {} });
        const err = Object.assign(new Error('missing'), { code: 'ENOENT' });
        vi.mocked(getBlocksPropsPromises).mockReturnValue({
            blockA: Promise.reject(err),
        } as any);

        const result = await getBlocksProps(
            { locale: 'cs', params: { slug: ['about'] }, preview: false } as any,
            providers,
            {},
            ssg,
        );

        expect(result.notFound).toBe(true);
        expect(result.props.blocksPropsMap).toEqual({});
    });

    it('should not mark 404 slug as notFound on ENOENT', async () => {
        getPageBySlug.mockResolvedValue({ page: { documentId: '1' }, webSetting: {} });
        const err = Object.assign(new Error('missing'), { code: 'ENOENT' });
        vi.mocked(getBlocksPropsPromises).mockReturnValue({
            blockA: Promise.reject(err),
        } as any);

        const result = await getBlocksProps(
            { locale: 'cs', params: { slug: ['404'] }, preview: false } as any,
            providers,
            {},
            ssg,
        );

        expect(result.notFound).toBeUndefined();
    });

    it('should rethrow errors other than ENOENT', async () => {
        getPageBySlug.mockResolvedValue({ page: { documentId: '1' }, webSetting: {} });
        vi.mocked(getBlocksPropsPromises).mockReturnValue({
            blockA: Promise.reject(new Error('boom')),
        } as any);

        await expect(
            getBlocksProps({ locale: 'cs', params: { slug: ['about'] }, preview: false } as any, providers, {}, ssg),
        ).rejects.toThrow('boom');
    });
});
