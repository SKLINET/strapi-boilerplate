import { IApp } from '../../../../types/base/app';
import { BlocksPropsMap } from '../../../../types/base/block';
import { getBlockType } from '../../../../utils/base/getBlockType/getBlockType';
import { cacheTag } from '../../../../utils/cache/tag';
import { loadBlock } from '../../../blocks/client';

interface BlocksProps {
    blocksData: readonly any[] | null;
    initialProps?: BlocksPropsMap;
    app: IApp;
    isTemplateBlock?: boolean;
}

export const Blocks = async ({ blocksData, initialProps = {}, app, isTemplateBlock = false }: BlocksProps) => (
    <>
        {blocksData?.map(async (block, i) => {
            const blockName = getBlockType(block?.__typename)?.replace('ComponentBlock', '');
            if (!blockName) {
                return null;
            }

            if (blockName === 'TemplateBlock') {
                if (block.template?.documentId) {
                    cacheTag('template', block.template.documentId);
                }
                return (
                    <Blocks
                        key={`block_${i}`}
                        blocksData={block.template?.content || []}
                        initialProps={initialProps[block.id]?.data || {}}
                        app={app}
                        isTemplateBlock
                    />
                );
            }

            const BlockComponent = (await loadBlock(blockName, isTemplateBlock))?.default || null;

            if (!BlockComponent) {
                return null;
            }

            const blockInitialProps =
                initialProps && Object.prototype.hasOwnProperty.call(initialProps, block.id)
                    ? initialProps[block.id]
                    : undefined;

            return <BlockComponent blocksData={block} {...(blockInitialProps as any)} app={app} key={`block_${i}`} />;
        })}
    </>
);
