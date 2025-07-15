'use client';

import React, { ReactElement, useState } from 'react';
import styles from './DataModal.module.scss';
import clsx from 'clsx';
import { IApp } from '../../../../types/base/app';
import { Icon } from '../../primitives/Icon/Icon';
import { RemoveScroll } from 'react-remove-scroll';
import { Category } from './Category/Category';

interface DataModalProps {
    app: IApp;
}

const DataModal = ({
    app: { webSetting, page, systemResources, item, blocksPropsMap, ...rest },
}: DataModalProps): ReactElement => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <RemoveScroll enabled={isOpen} className={clsx(styles.modal, isOpen && styles.isOpen)}>
                <div className={styles.overlay} onClick={() => setIsOpen(false)} />
                <div className={styles.inner}>
                    <Category title="⚙️ Nastavení webu" data={webSetting || {}} />
                    <Category title="📝 Stránka" data={page || {}} />
                    <Category title="🧩 Všeobecné texty" data={systemResources || {}} />
                    <Category title="📝 Detail obsahu" data={item || {}} />
                    <Category title="📦 Data bloků" data={blocksPropsMap || {}} />
                    <Category title="🧹 Ostatní" data={rest || {}} />
                </div>
            </RemoveScroll>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={`${isOpen ? 'Hide' : 'Show'} modal`}
                className={styles.mainButton}
            >
                <Icon name="sklinet-round" />
            </button>
        </>
    );
};

export { DataModal };
