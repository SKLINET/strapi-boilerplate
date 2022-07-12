import React, { ReactElement } from 'react';
import styles from './Switch.module.scss';
import clsx from 'clsx';
import { UseFormRegister } from 'react-hook-form';

export interface SwitchProps {
    name: string;
    register: UseFormRegister<any>;
    checked: boolean;
    error?: string | undefined;
    placeholder?: string;
    className?: string;
}

const Switch = ({ name, register, checked, error, placeholder, className }: SwitchProps): ReactElement => (
    <div className={clsx(styles.wrapper, checked && styles.active, className)}>
        <label className={styles.content}>
            <div className={styles.column}>
                <div className={styles.innerRound} />
            </div>
            <p className={styles.placeholder}>{placeholder}</p>
            <input type="checkbox" {...register(name)} autoComplete="off" className={styles.input} />
        </label>
        {error && <p className={styles.error}>{error}</p>}
    </div>
);

export { Switch };
