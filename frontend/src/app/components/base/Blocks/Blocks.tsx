import React, { ReactElement } from 'react';
import { getBlockName } from '@symbio/headless/utils';
import blocks from '../../../blocks';
import { BlocksPropsMap } from '@symbio/headless';
import { IApp } from '../../../../types/base/app';

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
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <BlockComponent blocksData={block} {...blockInitialProps} app={app} key={`block_${i}`} />
            );
        })}
    </>
);
