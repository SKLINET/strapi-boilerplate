'use client';

import { ReactElement, useEffect, useState } from 'react';
import styles from './GridHelper.module.scss';
import clsx from 'clsx';
import { Icon } from '../../primitives/Icon/Icon';

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
        <>
            <div className={clsx(styles.wrapper, visible && styles.show)}>
                <div className={styles.inner}>
                    {Array.from(Array(12).keys()).map((e) => (
                        <div key={e} className={styles.column} />
                    ))}
                </div>
            </div>
            <button type="button" onClick={() => setVisible(!visible)} className={styles.mainButton}>
                <Icon name={visible ? 'gridOff' : 'gridOn'} className={styles.icon} />
            </button>
        </>
    );
};
