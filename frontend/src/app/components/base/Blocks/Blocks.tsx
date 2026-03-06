import { ReactElement } from 'react';
import { IApp } from '../../../../types/base/app';
import { BlocksPropsMap } from '../../../../types/base/block';
import { SearchParamsProps } from '../../../../types/base/page';
import { getBlockType } from '../../../../utils/base/getBlockType/getBlockType';
import blocks from '../../../blocks/server';

interface BlocksProps {
    blocksData: readonly any[] | null;
    initialProps?: BlocksPropsMap;
    app: IApp;
    searchParams?: Promise<SearchParamsProps> | undefined;
}

export const Blocks = async ({
    blocksData,
    initialProps = {},
    app,
    searchParams,
}: BlocksProps): Promise<ReactElement> => (
    <>
        {blocksData?.map(async (block, i) => {
            const blockName = getBlockType(block?.__typename)?.replace('ComponentBlock', '');
            if (!blockName) {
                return null;
            }

            if (blockName === 'TemplateBlock') {
                return (
                    <Blocks
                        key={`block_${i}`}
                        blocksData={block.template?.content || []}
                        initialProps={initialProps[block.id]?.data || {}}
                        app={app}
                        searchParams={searchParams}
                    />
                );
            }

            const BlockComponent = blocks[blockName as keyof typeof blocks];

            if (!BlockComponent) {
                return null;
            }

            const blockInitialProps =
                initialProps && Object.prototype.hasOwnProperty.call(initialProps, block.id)
                    ? initialProps[block.id]
                    : undefined;

            return (
                <BlockComponent
                    blocksData={block}
                    {...(blockInitialProps as any)}
                    app={app}
                    key={`block_${i}`}
                    searchParams={searchParams}
                />
            );
        })}
    </>
);
