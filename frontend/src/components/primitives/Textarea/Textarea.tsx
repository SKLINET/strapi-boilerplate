import React, { ReactElement } from 'react';
import styles from './Textarea.module.scss';
import clsx from 'clsx';
import { UseFormRegister } from 'react-hook-form';

export interface TextareaProps {
    name: string;
    register: UseFormRegister<any>;
    error?: string | undefined;
    placeholder?: string;
    className?: string;
}

const Textarea = ({ name, register, error, placeholder, className }: TextareaProps): ReactElement => (
    <div className={clsx(styles.wrapper, className)}>
        <textarea
            {...register(name)}
            placeholder={placeholder}
            autoComplete="off"
            rows={4}
            className={styles.textarea}
        />
        {error && <p className={styles.error}>{error}</p>}
    </div>
);

export { Textarea };
