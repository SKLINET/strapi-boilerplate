import React, { ReactElement, ReactNode } from 'react';
import styles from './Blockquote.module.scss';
import config from '../../../../sklinet.config.json';

export interface BlockquoteProps {
    children: ReactNode | string;
}

const Blockquote = ({ children }: BlockquoteProps): ReactElement<BlockquoteProps, 'div'> | null => {
    return <blockquote className={styles.blockquote}>{children}</blockquote>;
};

Blockquote.whyDidYouRender = config.whyDidYouRender.active;

export { Blockquote };
