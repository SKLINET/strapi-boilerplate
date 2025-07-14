import React, { ReactElement, ReactNode } from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';
import { Link } from '../Link/Link';
import { Icon } from '../Icon/Icon';
import { nbsp } from '../../../../utils/nbsp';

interface ButtonProps {
    children: ReactNode;
    alt?: string | null;
    onClick?: () => void;
    href?: string | null;
    openInNewTab?: boolean;
    submit?: boolean;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
}

const Button = ({
    children,
    alt,
    onClick,
    href,
    openInNewTab,
    submit,
    loading = false,
    disabled = false,
    className,
}: ButtonProps): ReactElement => {
    const allClassNames = clsx(styles.wrapper, loading && styles.loading, className);

    const _children = (
        <>
            {typeof children === 'string' ? nbsp(children) : children}
            <span className={clsx(styles.loader, loading && styles.show)}>
                <Icon name="loader" className={styles.icon} />
            </span>
        </>
    );
    const _alt = alt || (typeof children === 'string' ? children : '');

    const _disabled = disabled || loading;

    if (_alt.length === 0) {
        console.error('Chybějící alt u tlačítka');
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
            <Link href={href} openInNewTab={openInNewTab || false} className={allClassNames} alt={_alt}>
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
