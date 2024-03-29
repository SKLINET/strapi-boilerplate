'use client';

import React, { ReactElement, useEffect, useState } from 'react';
import styles from './GridHelper.module.scss';
import clsx from 'clsx';

export const GridHelper = (): ReactElement => {
    const [visible, setVisible] = useState(false);

    const ctrlGListener = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === 'g') {
            setVisible(!visible);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', ctrlGListener);

        return () => window.removeEventListener('keydown', ctrlGListener);
    });

    return (
        <div className={clsx(styles.wrapper, visible && styles.show)}>
            <div className={styles.inner}>
                {Array.from(Array(12).keys()).map((e) => (
                    <div key={e} className={styles.column} />
                ))}
            </div>
        </div>
    );
};
