'use client';

import React, { ReactElement } from 'react';
import styles from './BurgerButton.module.scss';
import clsx from 'clsx';
import { IApp } from '../../../../types/base/app';
import { getSystemResource } from '../../../../utils/strapi/getSystemResource';

interface BurgerButtonProps {
    onClick: () => void;
    active: boolean;
    app: IApp;
    className?: string;
}

const BurgerButton = ({ onClick, active, app, className }: BurgerButtonProps): ReactElement => (
    <button
        type="button"
        onClick={onClick}
        aria-label={getSystemResource(active ? 'hide_menu' : 'show_menu', app?.systemResources)}
        className={clsx(styles.wrapper, active && styles.active, className)}
    >
        <span className={styles.line} />
        <span className={styles.line} />
        <span className={styles.line} />
    </button>
);

export { BurgerButton };
