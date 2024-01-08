import React, { ReactElement, ReactNode } from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';
import { Link } from '../Link/Link';
import { Icon } from '../Icon/Icon';
import { nbsp } from '../../../../utils/nbsp';

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    href?: string | null;
    openInNewTab?: boolean;
    submit?: boolean;
    loading?: boolean;
    className?: string;
}

const Button = ({
    children,
    onClick,
    href,
    openInNewTab,
    submit,
    loading = false,
    className,
}: ButtonProps): ReactElement => {
    const allClassNames = clsx(styles.wrapper, loading && styles.loading, className);

    const _children = (
        <>
            {typeof children === 'string' ? nbsp(children) : children}
            <div className={clsx(styles.loader, loading && styles.show)}>
                <Icon name="loader" className={styles.icon} />
            </div>
        </>
    );

    if (onClick) {
        return (
            <button type="button" onClick={() => onClick()} className={allClassNames} disabled={loading}>
                {_children}
            </button>
        );
    }

    if (href) {
        return (
            <Link href={href} openInNewTab={openInNewTab || false} className={allClassNames}>
                {_children}
            </Link>
        );
    }

    if (submit) {
        return (
            <button type="submit" className={allClassNames} disabled={loading}>
                {_children}
            </button>
        );
    }

    return <></>;
};

export { Button };
