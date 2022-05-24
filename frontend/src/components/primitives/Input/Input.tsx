import React, { HTMLProps, ReactElement, useState } from 'react';
import clsx from 'clsx';
import { Icon, Icons } from '../Icon/Icon';
import styles from './Input.module.scss';

export interface InputProps extends HTMLProps<HTMLInputElement> {
    readonly icon?: Icons;
    error: string | null;
}

const Input = ({ label, icon, type, id, checked, error, ...props }: InputProps): ReactElement => {
    const [showPassword, setShowPassword] = useState(false);

    const hasIcon = !!(icon && icon.length > 0);
    const hasError = !!error;
    const isPassword = type === 'password';

    return (
        <div
            className={clsx(
                styles.container,
                type === 'radio' && styles.isRadio,
                type === 'checkbox' && styles.isCheckbox,
                hasIcon && styles.hasIcon,
                hasError && styles.hasError,
                !checked || styles.isActive,
            )}
        >
            {label && (
                <label className={styles.label} htmlFor={id}>
                    {type === 'checkbox' && <Icon name="tick" className={styles.checkboxIcon} />}
                    {label}
                </label>
            )}
            {icon && <Icon name={icon} />}
            <input
                className={styles.input}
                {...props}
                type={isPassword ? (showPassword ? 'text' : type) : type}
                checked={checked}
                id={id}
            />
            {isPassword && (
                <button
                    className={styles.showPasswordIcon}
                    onClick={(): void => setShowPassword(!showPassword)}
                    type="button"
                >
                    <Icon name={showPassword ? 'tick' : 'tick'} className={styles.iconCommon} />
                </button>
            )}
            {hasError && <p className={styles.error}>{error}</p>}
        </div>
    );
};

Input.whyDidYouRender = true;

export { Input };
