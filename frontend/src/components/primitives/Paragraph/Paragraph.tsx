import React, { ReactElement, ReactNode } from 'react';
import styles from './Paragraph.module.scss';
import clsx from 'clsx';
import { nbsp } from '../../../utils/nbsp';

export interface ParagraphProps {
    children: ReactNode;
    className?: string;
}

const Paragraph = ({ children, className }: ParagraphProps): ReactElement => (
    <p className={clsx(styles.wrapper, className)}>{typeof children === 'string' ? nbsp(children) : children}</p>
);

export { Paragraph };
