import { GetStaticPropsContext } from 'next';
import { IApp } from '../../types/base/app';
import { BlocksPropsMap, BlocksPropsPromisesMap } from '../../types/base/block';

function getBlockName(block: { __typename?: string } | null): string | undefined {
    return block?.__typename?.replace(/Record$/, 'Block').replace('BlockBlock', 'Block');
}

export const getNestedBlocksProps = async (
    context: GetStaticPropsContext,
    blocks: Record<string, any>,
    page: Record<string, any>,
    items: ReadonlyArray<any>,
    locale?: string | null,
    slug?: string,
    providers?: any,
    item?: any,
    settings?: IApp['webSetting'],
): Promise<Record<string, any>> => {
    const blocksPropsPromises: BlocksPropsPromisesMap = {};
    items?.map((block) => {
        const originalName = getBlockName(block);
        const blockName = getBlockName(block)?.replace('ComponentBlock', '');
        const condition =
            Object.prototype.hasOwnProperty.call(blocks, String(blockName)) ||
            Object.prototype.hasOwnProperty.call(blocks, String(originalName));
        if (!blockName || !condition) {
            return null;
        }
        if (blockName && condition) {
            const blk = blocks[blockName] || blocks[String(originalName)];
            if (blk && blk.getStaticProps) {
                blocksPropsPromises[block.id] = blk.getStaticProps({
                    context,
                    locale,
                    page,
                    block,
                    providers,
                    blocks,
                    slug,
                    item,
                    settings,
                });
            }
        }
    });

    try {
        const values = await Promise.all(Object.entries(blocksPropsPromises).flat());
        const blocksPropsMap: BlocksPropsMap = {};
        for (let i = 0; i < values.length; i += 2) {
            blocksPropsMap[values[i] as string] = values[i + 1];
        }
        return {
            blocksPropsMap,
        };
    } catch (e) {
        console.log('ERR', e);
    }

    return {
        blocksProps: [],
    };
};
