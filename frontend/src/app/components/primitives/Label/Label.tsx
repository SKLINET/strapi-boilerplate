import React, { ReactElement, ReactNode } from 'react';
import styles from './Label.module.scss';
import clsx from 'clsx';
import { nbsp } from '../../../../utils/nbsp';

export interface LabelProps {
    children: ReactNode;
    className?: string;
}

const Label = ({ children, className }: LabelProps): ReactElement => (
    <span className={clsx(styles.wrapper, className)}>{typeof children === 'string' ? nbsp(children) : children}</span>
);

export { Label };
