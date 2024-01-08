'use client';

import React, { ReactElement } from 'react';
import styles from './Textarea.module.scss';
import clsx from 'clsx';
import { UseFormRegister } from 'react-hook-form';
import { Paragraph } from '../Paragraph/Paragraph';

export interface TextareaProps {
    name: string;
    register: UseFormRegister<any>;
    error?: string | undefined;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
}

const Textarea = ({ name, register, error, disabled = false, placeholder, className }: TextareaProps): ReactElement => (
    <div className={clsx(styles.wrapper, className)}>
        <textarea
            {...register(name)}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete="off"
            rows={4}
            className={styles.textarea}
        />
        {error && (
            <div className={styles.error}>
                <Paragraph className={styles.label}>{error}</Paragraph>
            </div>
        )}
    </div>
);

export { Textarea };
