import React, { ReactElement } from 'react';
import styles from './Skeleton.module.scss';
import clsx from 'clsx';

interface SkeletonProps {
    className?: string;
}

const Skeleton = ({ className }: SkeletonProps): ReactElement => (
    <div className={clsx(styles.wrapper, className)}>
        <div className={styles.fields}>
            <div className={styles.field} />
            <div className={styles.field} />
            <div className={styles.field} />
            <div className={styles.field} />
            <div className={clsx(styles.field, styles.large)} />
        </div>
        <div className={styles.button} />
    </div>
);

export { Skeleton };
