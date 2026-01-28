'use client';

import React, { ReactElement, ReactNode } from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';
import { Link } from '../Link/Link';
import { Icon, Icons } from '../Icon/Icon';
import { nbsp } from '../../../../utils/nbsp';
import { usePathname } from 'next/navigation';
import { scrollToAnchor } from '../../../../utils/scrollToAnchor';

interface ButtonProps {
    children: ReactNode;
    alt?: string | null;
    type?: 'fill' | 'outline';
    color?: 'black';
    size?: 'md';
    icon?: Icons | null;
    iconPosition?: 'left' | 'right';
    onClick?: () => void;
    href?: string | null;
    openInNewTab?: boolean;
    anchor?: string | null;
    submit?: boolean;
    loading?: boolean;
    disabled?: boolean;
    stretchOnMobile?: boolean;
    className?: string;
}

const Button = ({
    children,
    alt,
    type = 'fill',
    color = 'black',
    size = 'md',
    icon,
    iconPosition = 'right',
    onClick,
    href,
    openInNewTab,
    anchor,
    submit,
    loading = false,
    disabled = false,
    stretchOnMobile,
    className,
}: ButtonProps): ReactElement => {
    const pathname = usePathname();

    const allClassNames = clsx(
        styles.wrapper,
        styles[type],
        styles[color],
        styles[size],
        loading && styles.loading,
        stretchOnMobile && styles.stretchOnMobile,
        className,
    );

    const withAnchorOnly = anchor && (!href || href === pathname);

    const _icon = icon || (withAnchorOnly ? 'arrowDown' : null);

    const _children = (
        <>
            <span className={styles.children}>
                {_icon && iconPosition === 'left' && <Icon name={_icon} className={styles.icon} />}
                <span className={styles.label}>{typeof children === 'string' ? nbsp(children) : children}</span>
                {_icon && iconPosition === 'right' && <Icon name={_icon} className={styles.icon} />}
            </span>
            <span className={clsx(styles.loader, loading && styles.show)}>
                <Icon name="loader" className={styles.icon} />
            </span>
        </>
    );
    const _alt = alt || (typeof children === 'string' ? children : '');

    const _disabled = disabled || loading;

    if (_alt.length === 0) {
        console.error('⚠️  Missing alt for button');
    }

    if (withAnchorOnly) {
        return (
            <button
                type="button"
                onClick={() => scrollToAnchor(anchor)}
                className={allClassNames}
                disabled={_disabled}
                aria-label={_alt}
            >
                {_children}
            </button>
        );
    }

    if (onClick) {
        return (
            <button
                type="button"
                onClick={() => onClick()}
                className={allClassNames}
                disabled={_disabled}
                aria-label={_alt}
            >
                {_children}
            </button>
        );
    }

    if (href) {
        return (
            <Link
                href={href + (anchor ? `#${anchor}` : '')}
                openInNewTab={openInNewTab || false}
                className={allClassNames}
                alt={_alt}
            >
                {_children}
            </Link>
        );
    }

    if (submit) {
        return (
            <button type="submit" className={allClassNames} disabled={_disabled} aria-label={_alt}>
                {_children}
            </button>
        );
    }

    return <div className={allClassNames}>{_children}</div>;
};

export { Button };
