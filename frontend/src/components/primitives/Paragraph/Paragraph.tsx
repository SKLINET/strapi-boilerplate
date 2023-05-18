import React, { ReactElement, ReactNode } from 'react';
import styles from './Paragraph.module.scss';
import config from '../../../../sklinet.config.json';

export interface ParagraphProps {
    children: ReactNode;
}

const Paragraph = ({ children }: ParagraphProps): ReactElement<ParagraphProps, 'p'> | null => {
    return <p className={styles.paragraph}>{children}</p>;
};

Paragraph.whyDidYouRender = config.whyDidYouRender.active;

export { Paragraph };
