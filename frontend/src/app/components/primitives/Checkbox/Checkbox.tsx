import React, { ReactElement } from 'react';
import styles from './Checkbox.module.scss';
import clsx from 'clsx';
import { UseFormRegister } from 'react-hook-form';
import { Icon } from '../Icon/Icon';
import { Paragraph } from '../Paragraph/Paragraph';
import { RichText } from '../RichText/RichText';

export interface CheckboxProps {
    name: string;
    register: UseFormRegister<any>;
    checked: boolean;
    error?: string | undefined;
    label?: string;
    disabled?: boolean;
    className?: string;
}

const Checkbox = ({
    name,
    register,
    checked,
    error,
    label,
    disabled = false,
    className,
}: CheckboxProps): ReactElement => {
    return (
        <div className={clsx(styles.wrapper, className)}>
            <label className={clsx(styles.content, checked && styles.checked, disabled && styles.disabled)}>
                <div className={styles.column}>
                    <Icon name="tick" className={styles.icon} />
                </div>
                <Paragraph className={styles.label}>
                    <RichText content={label || ''} />
                </Paragraph>
                <input
                    type="checkbox"
                    {...register(name)}
                    autoComplete="off"
                    disabled={disabled}
                    className={styles.input}
                />
            </label>
            {error && <Paragraph className={styles.error}>{error}</Paragraph>}
        </div>
    );
};

export { Checkbox };
