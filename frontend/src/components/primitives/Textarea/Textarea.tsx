import React, { ReactElement } from 'react';
import styles from './Textarea.module.scss';
import clsx from 'clsx';
import { UseFormRegister } from 'react-hook-form';

export interface TextAreaProps {
    name: string;
    register: UseFormRegister<any>;
    error?: string | undefined;
    placeholder?: string;
    className?: string;
}

const TextArea = ({ name, register, error, placeholder, className }: TextAreaProps): ReactElement => (
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

export { TextArea };
