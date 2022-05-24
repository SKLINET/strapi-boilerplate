import React, { HTMLProps, ReactElement, TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Textarea.module.scss';
import { Icon, Icons } from '../Icon/Icon';

export interface TextareaProps extends HTMLProps<HTMLTextAreaElement> {
    readonly icon?: Icons;
    error: string | null;
}

const Textarea = ({
    onChange,
    icon,
    error,
    id,
    label,
    ...props
}: TextareaProps): ReactElement<TextareaHTMLAttributes<HTMLTextAreaElement>, 'textarea'> => {
    const isIcon = !!(icon && icon.length > 0);
    const isError = !!error;
    const ref = React.useRef<HTMLTextAreaElement>(null);

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
        if (e.target) {
            e.target.style.height = e.target.scrollHeight + 1 + 'px';
        }
        onChange && onChange(e);
    }

    return (
        <div className={styles.container}>
            {label && (
                <label
                    className={clsx(styles.label, isIcon && styles.iconLabel, isError && styles.errorLabel)}
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            {icon && <Icon name={icon} />}
            <textarea
                className={clsx(styles.textarea, isIcon && styles.iconTextarea, isError && styles.errorTextarea)}
                ref={ref}
                {...props}
                id={id}
                onChange={handleChange}
            />
            {isError && <p className={styles.error}>{error}</p>}
        </div>
    );
};

Textarea.whyDidYouRender = true;

export { Textarea };
