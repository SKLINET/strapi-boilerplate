'use client';

import React, { ReactElement, useRef, useState, useEffect } from 'react';
import styles from './Category.module.scss';
import clsx from 'clsx';
import { Icon } from '../../../primitives/Icon/Icon';

interface CategoryProps {
    title: string;
    data: any;
}

const Category = ({ title, data }: CategoryProps): ReactElement => {
    const ref = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const updateHeight = () => {
            if (!ref?.current) return;

            const height = ref.current.scrollHeight;

            ref.current.style.height = isOpen ? `${height}px` : '0px';
        };

        updateHeight();
        window.addEventListener('resize', updateHeight, { passive: true });

        return () => window.removeEventListener('resize', updateHeight);
    }, [ref, isOpen]);

    return (
        <div className={clsx(styles.wrapper, isOpen && styles.isOpen)}>
            <button type="button" onClick={() => setIsOpen(!isOpen)} className={styles.topbar}>
                <span className={styles.label}>{title}</span>
                <Icon name="plus" className={styles.icon} />
            </button>
            <div className={styles.content} ref={ref}>
                <div className={styles.inner}>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            </div>
        </div>
    );
};

export { Category };
