import { describe, it, expect, vi } from 'vitest';
import { getBlockName, getBlocksPropsPromises } from './index';

describe('getBlockName', () => {
    it('should return undefined for null or missing typename', () => {
        expect(getBlockName(null)).toBeUndefined();
        expect(getBlockName({})).toBeUndefined();
    });

    it('should replace a Record suffix with Block', () => {
        expect(getBlockName({ __typename: 'ArticleDetailRecord' })).toBe('ArticleDetailBlock');
    });

    it('should collapse BlockBlock after the Record rewrite', () => {
        expect(getBlockName({ __typename: 'VideoBlockRecord' })).toBe('VideoBlock');
    });
});

describe('getBlocksPropsPromises', () => {
    it('should return an empty map when content is missing', () => {
        expect(getBlocksPropsPromises(null, 'cs', {} as any, {} as any, {}, null)).toEqual({});
        expect(getBlocksPropsPromises({ content: [] } as any, 'cs', {} as any, {} as any, {}, null)).toEqual({});
    });

    it('should skip unknown, %other, and id-less blocks', () => {
        const getStaticProps = vi.fn();
        const blocks = { KnownBlock: { getStaticProps } } as any;
        const page = {
            content: [
                { __typename: 'UnknownRecord', id: '1' },
                { __typename: '%other', id: '2' },
                { __typename: 'KnownRecord' },
            ],
        } as any;

        expect(getBlocksPropsPromises(page, 'cs', {} as any, {} as any, blocks, null)).toEqual({});
        expect(getStaticProps).not.toHaveBeenCalled();
    });

    it('should call getStaticProps for matching blocks and key by id', () => {
        const getStaticProps = vi.fn(async () => ({ ok: true }));
        const blocks = { ArticleDetailBlock: { getStaticProps } } as any;
        const block = { __typename: 'ArticleDetailRecord', id: 'b1' };
        const page = { content: [block] } as any;
        const context = { preview: false } as any;
        const providers = { page: {} } as any;
        const settings = { id: 'ws' } as any;

        const result = getBlocksPropsPromises(page, 'en', context, providers, blocks, settings);

        expect(getStaticProps).toHaveBeenCalledWith({
            context,
            locale: 'en',
            page,
            block,
            providers,
            blocks,
            settings,
        });
        expect(result).toHaveProperty('b1');
    });
});
