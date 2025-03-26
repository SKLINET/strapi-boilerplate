import { Providers } from '../../types/base/providers';
import { BlocksPropsPromisesMap, BlockType } from '../../types/base/block';
import { IContext } from '../../types/base/page';
import { appDataQuery$data } from '../../relay/__generated__/appDataQuery.graphql';
import { appPageQuery$data } from '../../relay/__generated__/appPageQuery.graphql';

export function getBlockName(block: { __typename?: string } | null): string | undefined {
    return block?.__typename?.replace(/Record$/, 'Block').replace('BlockBlock', 'Block');
}

export function getBlocksPropsPromises(
    page: appPageQuery$data['page'],
    locale: string,
    context: IContext,
    providers: Providers,
    blocks: Record<string, BlockType>,
    webSetting: appDataQuery$data['webSetting'],
): BlocksPropsPromisesMap {
    const blocksPropsPromises: BlocksPropsPromisesMap = {};
    if (page?.content && page.content.length > 0) {
        for (const block of page.content) {
            const blockName = getBlockName(block as any);
            if (blockName && Object.prototype.hasOwnProperty.call(blocks, blockName)) {
                const blk = blocks[blockName];
                if (blk.getStaticProps && block && block.__typename !== '%other' && block.id) {
                    blocksPropsPromises[block.id] = blk.getStaticProps({
                        context,
                        locale,
                        page,
                        block,
                        providers,
                        blocks,
                        settings: webSetting,
                    });
                }
            }
        }
    }

    return blocksPropsPromises;
}
