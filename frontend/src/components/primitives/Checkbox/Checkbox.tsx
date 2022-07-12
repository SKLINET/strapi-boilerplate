import React, { ReactElement } from 'react';
import styles from './Checkbox.module.scss';
import clsx from 'clsx';
import { UseFormRegister } from 'react-hook-form';
import { Icon } from '../Icon/Icon';

export interface CheckboxProps {
    name: string;
    register: UseFormRegister<any>;
    checked: boolean;
    error?: string | undefined;
    placeholder?: string;
    className?: string;
}

const Checkbox = ({ name, register, checked, error, placeholder, className }: CheckboxProps): ReactElement => (
    <div className={clsx(styles.wrapper, checked && styles.active, className)}>
        <label className={styles.content}>
            <div className={styles.column}>
                <Icon name="tick" className={styles.icon} />
            </div>
            <p className={styles.placeholder}>{placeholder}</p>
            <input type="checkbox" {...register(name)} autoComplete="off" className={styles.input} />
        </label>
        {error && <p className={styles.error}>{error}</p>}
    </div>
);

export { Checkbox };
