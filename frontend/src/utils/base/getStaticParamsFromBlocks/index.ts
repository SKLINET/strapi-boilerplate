import { ParsedUrlQuery } from 'querystring';
import { getBlockType } from '../getBlockType/getBlockType';
import { Providers } from '../../../types/base/providers';
import { BlockType } from '../../../types/base/block';

export async function getStaticParamsFromBlocks(
    content: ReadonlyArray<{ __typename: string } | null> | null,
    locale: string,
    providers: Providers,
    blocks: Record<string, BlockType>,
): Promise<ParsedUrlQuery[]> {
    if (!content) {
        return [];
    }

    let blockParams: ParsedUrlQuery[] = [];
    for (const block of content) {
        const blockName = getBlockType(block?.__typename);
        if (blockName && Object.prototype.hasOwnProperty.call(blocks, blockName)) {
            const blk = blocks[blockName];
            if (blk && blk.getStaticPaths) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const newParams = await blk.getStaticPaths(locale, providers);
                if (blockParams.length === 0) {
                    blockParams.push(...newParams);
                } else {
                    blockParams = blockParams.reduce((acc: ParsedUrlQuery[], val) => {
                        for (const newParam of newParams) {
                            acc.push({ ...val, ...newParam });
                        }
                        return acc;
                    }, []);
                }
            }
        }
    }

    return blockParams;
}
