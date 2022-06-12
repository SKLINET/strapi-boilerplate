import React, { ReactElement } from 'react';
import { getBlockName } from '@symbio/headless/utils';
import blocks from '../../../blocks';
import { AppContextProps, BlocksPropsMap } from '@symbio/headless';
import { PageProps } from '../../../types/page';
import { WebSettingsProps } from '../../../types/webSettings';

interface BlocksProps {
    blocksData: readonly any[] | null;
    initialProps?: BlocksPropsMap;
    app: AppContextProps<PageProps, WebSettingsProps>;
}

export const Blocks = ({ blocksData, initialProps, app }: BlocksProps): ReactElement => (
    <>
        {blocksData?.map((block, i) => {
            const blockName = getBlockName(block)?.replace('ComponentBlock', '');
            if (!blockName || !Object.prototype.hasOwnProperty.call(blocks, blockName)) {
                return null;
            }
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
