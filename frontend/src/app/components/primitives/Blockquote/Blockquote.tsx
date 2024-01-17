import React, { ReactElement, ReactNode } from 'react';
import styles from './Blockquote.module.scss';

export interface BlockquoteProps {
    children: ReactNode | string;
}

const Blockquote = ({ children }: BlockquoteProps): ReactElement<BlockquoteProps, 'div'> | null => {
    return <blockquote className={styles.blockquote}>{children}</blockquote>;
};

Blockquote.whyDidYouRender = true;

export { Blockquote };
