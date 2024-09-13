import React, { ReactElement, ReactNode } from 'react';
import styles from './WidthLimiter.module.scss';
import clsx from 'clsx';

interface WidthLimiterProps {
    children: ReactNode;
    className?: string;
}

const WidthLimiter = ({ children, className }: WidthLimiterProps): ReactElement => (
    <div className={clsx(styles.wrapper, className)}>{children}</div>
);

export { WidthLimiter };
