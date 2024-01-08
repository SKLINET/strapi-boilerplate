'use client';

import React, { ReactElement } from 'react';
import styles from './TextInput.module.scss';
import clsx from 'clsx';
import { UseFormRegister } from 'react-hook-form';
import { Paragraph } from '../Paragraph/Paragraph';

export interface TextInputProps {
    name: string;
    type?: 'text' | 'email';
    register: UseFormRegister<any>;
    error?: string | undefined;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
}

const TextInput = ({
    name,
    type = 'text',
    register,
    error,
    disabled = false,
    placeholder,
    className,
}: TextInputProps): ReactElement => (
    <div className={clsx(styles.wrapper, className)}>
        <input
            type={type}
            {...register(name)}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete="off"
            className={styles.input}
        />
        {error && (
            <div className={styles.error}>
                <Paragraph className={styles.label}>{error}</Paragraph>
            </div>
        )}
    </div>
);

export { TextInput };
