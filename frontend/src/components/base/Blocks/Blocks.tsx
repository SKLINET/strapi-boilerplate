import React, { ReactElement } from 'react';
import blocks from '../../../blocks';
import { getBlockType } from '../../../utils/getBlockType/getBlockType';

import styles from './Blocks.module.scss';
import clsx from 'clsx';

interface BlocksProps {
    blocksData: readonly any[] | null | undefined;
    initialProps: any;
}

export const Blocks = ({ blocksData, initialProps }: BlocksProps): ReactElement => (
    <>
        {blocksData?.map((block, i) => {
            const blockType = getBlockType(block?.__typename);
            if (!blockType || !Object.prototype.hasOwnProperty.call(blocks, blockType)) {
                return null;
            }
            const BlockComponent = blocks[blockType];
            const blockInitialProps = (initialProps && initialProps[i]) || {};

            return (
                <div className={clsx(styles.wrapper, styles[block.__typename])} key={`block_${i}`}>
                    <div className={styles.content}>
                        <BlockComponent blocksData={block} {...blockInitialProps} />
                    </div>
                </div>
            );
        })}{' '}
    </>
);
