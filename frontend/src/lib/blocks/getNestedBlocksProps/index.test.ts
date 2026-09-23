import { describe, it, expect, vi } from 'vitest';
import { getNestedBlocksProps } from './index';

describe('getNestedBlocksProps', () => {
    it('should return an empty blocksPropsMap when there are no items', async () => {
        await expect(getNestedBlocksProps({} as any, {}, {}, [], 'cs')).resolves.toEqual({ blocksPropsMap: {} });
    });

    it('should skip blocks that are not in the map', async () => {
        const getStaticProps = vi.fn();
        const result = await getNestedBlocksProps(
            {} as any,
            { KnownBlock: { getStaticProps } },
            {},
            [{ __typename: 'UnknownRecord', id: '1' }],
            'cs',
        );

        expect(getStaticProps).not.toHaveBeenCalled();
        expect(result).toEqual({ blocksPropsMap: {} });
    });

    it('should call getStaticProps and key the map by block id', async () => {
        const getStaticProps = vi.fn(async () => ({ ok: true }));
        const block = { __typename: 'ArticleDetailRecord', id: 'n1' };
        const context = { preview: false } as any;
        const page = { documentId: 'p1' };
        const blocks = { ArticleDetailBlock: { getStaticProps } };
        const providers = {};
        const settings = { id: 'ws' } as any;

        const result = await getNestedBlocksProps(
            context,
            blocks,
            page,
            [block],
            'en',
            'about',
            providers,
            { item: true },
            settings,
        );

        expect(getStaticProps).toHaveBeenCalledWith({
            context,
            locale: 'en',
            page,
            block,
            providers,
            blocks,
            slug: 'about',
            item: { item: true },
            settings,
        });
        expect(result).toEqual({
            blocksPropsMap: { n1: { ok: true } },
        });
    });

    it('should resolve ComponentBlock-prefixed typenames', async () => {
        const getStaticProps = vi.fn(async () => ({ nested: true }));
        const block = { __typename: 'ComponentBlockVideoRecord', id: 'v1' };

        const result = await getNestedBlocksProps({} as any, { VideoBlock: { getStaticProps } }, {}, [block], 'cs');

        expect(getStaticProps).toHaveBeenCalled();
        expect(result).toEqual({ blocksPropsMap: { v1: { nested: true } } });
    });

    it('should return blocksProps array when getStaticProps throws', async () => {
        const log = vi.spyOn(console, 'log').mockImplementation(() => {});
        const getStaticProps = vi.fn(async () => {
            throw new Error('fail');
        });

        const result = await getNestedBlocksProps(
            {} as any,
            { ArticleDetailBlock: { getStaticProps } },
            {},
            [{ __typename: 'ArticleDetailRecord', id: 'n1' }],
            'cs',
        );

        expect(result).toEqual({ blocksProps: [] });
        expect(log).toHaveBeenCalled();
        log.mockRestore();
    });
});
