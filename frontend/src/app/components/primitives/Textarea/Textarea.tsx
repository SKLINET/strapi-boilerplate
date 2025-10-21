'use client';

import React, { ReactElement } from 'react';
import styles from './TextArea.module.scss';
import clsx from 'clsx';
import { UseFormRegister } from 'react-hook-form';
import { Text } from '../Text/Text';

export interface TextAreaProps {
    name: string;
    register: UseFormRegister<any>;
    error?: string | undefined;
    label?: string;
    disabled?: boolean;
    placeholder?: string;
    required?: boolean;
    className?: string;
}

const TextArea = ({
    name,
    register,
    error,
    label,
    disabled = false,
    placeholder,
    required,
    className,
}: TextAreaProps): ReactElement => (
    <div className={clsx(styles.wrapper, className)}>
        {label && (
            <Text className={styles.label}>
                {label}
                {required && <span className={styles.required}> *</span>}
            </Text>
        )}
        <div className={styles.inner}>
            <textarea
                {...register(name)}
                placeholder={placeholder}
                disabled={disabled}
                autoComplete="off"
                rows={4}
                className={styles.textarea}
            />
        </div>
        {error && <Text className={styles.error}>{error}</Text>}
    </div>
);

export { TextArea };
