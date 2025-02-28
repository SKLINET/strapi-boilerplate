import React, { ReactElement } from 'react';
import blocks from '../../../blocks';
import { IApp } from '../../../../types/base/app';
import { BlocksPropsMap } from '../../../../types/base/block';
import { getBlockName } from '../../../../lib/blocks/getBlocksProps';

interface BlocksProps {
    blocksData: readonly any[] | null;
    initialProps?: BlocksPropsMap;
    app: IApp;
}

export const Blocks = ({ blocksData, initialProps, app }: BlocksProps): ReactElement => (
    <>
        {blocksData?.map((block, i) => {
            const blockName = getBlockName(block)?.replace('ComponentBlock', '');
            if (!blockName || !Object.prototype.hasOwnProperty.call(blocks, blockName)) {
                return null;
            }

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const BlockComponent = blocks[blockName];
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
                    withoutAnimation={i === 0}
                />
            );
        })}
    </>
);
