import React, { ReactElement, useEffect, useState } from 'react';
import styles from './GridHelper.module.scss';
import clsx from 'clsx';

export const GridHelper = (): ReactElement => {
    const [visible, setVisible] = useState(false);

    const ctrlGListener = (e: KeyboardEvent) => {
        console.log('here');
        if (e.ctrlKey && e.key === 'g') {
            setVisible(!visible);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', ctrlGListener);

        return () => window.removeEventListener('keydown', ctrlGListener);
    });

    return (
        <div
            className={clsx(
                'fixed grid w-full h-full z-40 pointer-events-none inset-0 py-0 px-6 tablet:px-0',
                styles.wrapper,
                visible || 'hidden',
            )}
        >
            {Array.from(Array(16).keys()).map((e) => (
                <div key={e} className="w-full bg-red bg-opacity-10" />
            ))}
        </div>
    );
};
