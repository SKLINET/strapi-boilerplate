import React, { ReactElement } from 'react';
import blocks from '../../../blocks';
import { getBlockName } from '@symbio/headless/utils';
import { BlocksPropsMap } from '@symbio/headless';
import styles from './Blocks.module.scss';
import clsx from 'clsx';

interface BlocksProps {
    blocksData: readonly BlocksPropsMap[] | null | undefined;
    initialProps: any;
}

export const Blocks = ({ blocksData, initialProps }: BlocksProps): ReactElement => (
    <>
        {blocksData?.map((block, i) => {
            const blockName = getBlockName(block);
            if (!blockName || !Object.prototype.hasOwnProperty.call(blocks, blockName)) {
                return null;
            }
            const BlockComponent = blocks[blockName];
            const blockInitialProps =
                initialProps && Object.prototype.hasOwnProperty.call(initialProps, block.id as number)
                    ? initialProps[block.id as number]
                    : undefined;
            return (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <div className={clsx(styles.wrapper, styles[block.__typename])} key={`block_${i}`}>
                    <div className={styles.content}>
                        <BlockComponent blocksData={block} {...blockInitialProps} />
                    </div>
                </div>
            );
        })}
    </>
);
