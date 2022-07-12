import React, { ReactElement } from 'react';
import styles from './TextInput.module.scss';
import clsx from 'clsx';
import { UseFormRegister } from 'react-hook-form';

export interface TextInputProps {
    name: string;
    type?: 'text' | 'email';
    register: UseFormRegister<any>;
    error?: string | undefined;
    placeholder?: string;
    className?: string;
}

const TextInput = ({ name, type = 'text', register, error, placeholder, className }: TextInputProps): ReactElement => (
    <div className={clsx(styles.wrapper, className)}>
        <input type={type} {...register(name)} placeholder={placeholder} autoComplete="off" className={styles.input} />
        {error && <p className={styles.error}>{error}</p>}
    </div>
);

export { TextInput };
