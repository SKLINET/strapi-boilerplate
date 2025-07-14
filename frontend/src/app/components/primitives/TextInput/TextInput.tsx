'use client';

import React, { ReactElement } from 'react';
import styles from './TextInput.module.scss';
import clsx from 'clsx';
import { UseFormRegister } from 'react-hook-form';
import { Text } from '../Text/Text';

export interface TextInputProps {
    name: string;
    label?: string;
    type?: 'text' | 'email';
    register: UseFormRegister<any>;
    error?: string | undefined;
    disabled?: boolean;
    placeholder?: string;
    required?: boolean;
    className?: string;
}

const TextInput = ({
    name,
    label,
    type = 'text',
    register,
    error,
    disabled = false,
    placeholder,
    required,
    className,
}: TextInputProps): ReactElement => (
    <div className={clsx(styles.wrapper, className)}>
        {label && (
            <Text className={styles.label}>
                {label}
                {required && <span className={styles.required}> *</span>}
            </Text>
        )}
        <input
            type={type}
            {...register(name)}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete="off"
            className={styles.input}
        />
        {error && <Text className={styles.error}>{error}</Text>}
    </div>
);

export { TextInput };
