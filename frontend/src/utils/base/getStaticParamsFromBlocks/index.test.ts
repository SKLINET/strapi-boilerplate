import { describe, expect, it, vi } from 'vitest';
import { getStaticParamsFromBlocks } from './index';

describe('getStaticParamsFromBlocks', () => {
    it('should return [] when content is missing', async () => {
        expect(await getStaticParamsFromBlocks(null, 'cs', {} as any, {})).toEqual([]);
    });

    it('should collect params from matching blocks', async () => {
        const getStaticPaths = vi.fn(async () => [{ slug: ['a'] }, { slug: ['b'] }]);
        const params = await getStaticParamsFromBlocks(
            [{ __typename: 'ComponentBlockFormBlock' }, { __typename: 'Unknown' }],
            'cs',
            {} as any,
            { FormBlock: { getStaticPaths } as any },
        );
        expect(getStaticPaths).toHaveBeenCalledWith('cs', {});
        expect(params).toEqual([{ slug: ['a'] }, { slug: ['b'] }]);
    });

    it('should cartesian-merge params from subsequent blocks', async () => {
        const params = await getStaticParamsFromBlocks(
            [{ __typename: 'ComponentBlockFormBlock' }, { __typename: 'ComponentBlockVideoBlock' }],
            'en',
            {} as any,
            {
                FormBlock: { getStaticPaths: async () => [{ locale: 'en' }] } as any,
                VideoBlock: { getStaticPaths: async () => [{ id: '1' }, { id: '2' }] } as any,
            },
        );
        expect(params).toEqual([
            { locale: 'en', id: '1' },
            { locale: 'en', id: '2' },
        ]);
    });
});
