import { ReactElement } from 'react';
import styles from './Checkbox.module.scss';
import clsx from 'clsx';
import { UseFormRegister } from 'react-hook-form';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';
import { RichText } from '../RichText/RichText';

export interface CheckboxProps {
    name: string;
    register: UseFormRegister<any>;
    checked: boolean;
    error?: string | undefined;
    label?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
}

const Checkbox = ({
    name,
    register,
    checked,
    error,
    label,
    disabled = false,
    required,
    className,
}: CheckboxProps): ReactElement => {
    return (
        <div className={clsx(styles.wrapper, className)}>
            <label className={clsx(styles.content, checked && styles.checked, disabled && styles.disabled)}>
                <span className={styles.column}>
                    <Icon name="tick" className={styles.icon} />
                </span>
                <Text tag="span" className={styles.label}>
                    <RichText content={(label || '') + (required ? ` <span>*</span>` : '')} />
                </Text>
                <input
                    type="checkbox"
                    {...register(name)}
                    autoComplete="off"
                    disabled={disabled}
                    className={styles.input}
                />
            </label>
            {error && <Text className={styles.error}>{error}</Text>}
        </div>
    );
};

export { Checkbox };
