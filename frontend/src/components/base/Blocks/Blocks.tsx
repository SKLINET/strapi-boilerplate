import React, { ReactElement } from 'react';
import blocks from '../../../blocks';
import { getBlockName } from '@symbio/headless/utils';
import { BlocksPropsMap } from '@symbio/headless';

interface BlocksProps {
    blocksData: readonly BlocksPropsMap[] | null | undefined;
    initialProps: any;
    app: any;
}

export const Blocks = ({ blocksData, initialProps, app }: BlocksProps): ReactElement => (
    <>
        {blocksData?.map((block, i) => {
            const blockName = getBlockName(block)?.replace('ComponentBlock', '');
            if (!blockName || !Object.prototype.hasOwnProperty.call(blocks, blockName)) {
                return null;
            }
            const BlockComponent = blocks[blockName || ''];
            const blockInitialProps =
                initialProps && Object.prototype.hasOwnProperty.call(initialProps, block.id as number)
                    ? initialProps[block.id as number]
                    : undefined;
            return (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore

                <BlockComponent blocksData={block} {...blockInitialProps} app={app} key={`block_${i}`} />
            );
        })}
    </>
);
