import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import { Link } from '../Link/Link';
import { Icon, Icons } from '../Icon/Icon';
import styles from './Button.module.scss';

type IconPosition = 'left' | 'right';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
    page?: any; // ** TODO ** Fix page any
    params?: Record<string, string | number>;
    icon?: Icons;
    iconPosition?: IconPosition;
    target?: string;
    className?: string;
}

const Button = ({
    children,
    href,
    page,
    params,
    icon,
    iconPosition = 'left',
    disabled,
    type,
    className,
    ...rest
}: ButtonProps): JSX.Element => {
    if ((href || page) && type !== 'submit') {
        return (
            <div className={clsx(styles.button, styles.hasLink, disabled && styles.disabled, className)}>
                <Link className={styles.link} href={href} page={page} target={rest.target} params={params}>
                    {icon && iconPosition === 'left' && (
                        <Icon className={clsx(styles.icon, styles.iconOnLeft)} name={icon} />
                    )}
                    {children}
                    {icon && iconPosition === 'right' && (
                        <Icon className={clsx(styles.icon, styles.iconOnRight)} name={icon} />
                    )}
                </Link>
            </div>
        );
    } else {
        return (
            <button
                className={clsx(styles.button, disabled && styles.disabled, className)}
                type={type}
                disabled={disabled}
                {...rest}
            >
                {icon && iconPosition === 'left' && (
                    <Icon className={clsx(styles.icon, styles.iconOnLeft)} name={icon} />
                )}
                {children}
                {icon && iconPosition === 'right' && (
                    <Icon className={clsx(styles.icon, styles.iconOnRight)} name={icon} />
                )}
            </button>
        );
    }
};

Button.whyDidYouRender = true;

export { Button };
