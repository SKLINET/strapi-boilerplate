'use client';

import React, { ReactElement } from 'react';
import styles from './MenuLink.module.scss';
import clsx from 'clsx';
import { IMenuItem } from '../../../../../types/menu';
import { Link } from '../../../primitives/Link/Link';
import { Text } from '../../../primitives/Text/Text';
import { useAsPath } from '../../../../../utils/hooks/useAsPath';
import { usePathname } from 'next/navigation';
import { scrollToAnchor } from '../../../../../utils/scrollToAnchor';

interface MenuLinkProps {
    data: IMenuItem;
    handleClick?: () => void;
    className?: string;
}

const MenuLink = ({
    data: { label, href, openInNewTab, anchor },
    handleClick,
    className,
}: MenuLinkProps): ReactElement => {
    const asPath = useAsPath();
    const pathname = usePathname();

    const allClassNames = clsx(styles.wrapper, asPath === href && styles.active, className);
    const alt = label;

    const children = (
        <Text tag="span" className={styles.label}>
            {label}
        </Text>
    );

    const withAnchorOnly = anchor && (!href || href === pathname);

    if (withAnchorOnly) {
        return (
            <button
                type="button"
                onClick={() => {
                    handleClick && handleClick();
                    setTimeout(() => {
                        scrollToAnchor(anchor);
                    }, 100);
                }}
                className={allClassNames}
                aria-label={alt}
            >
                {children}
            </button>
        );
    }

    if (!href) return <></>;

    if (asPath === href) {
        return (
            <button
                type="button"
                onClick={() => {
                    handleClick && handleClick();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={allClassNames}
                aria-label={alt}
            >
                {children}
            </button>
        );
    }

    if (asPath.split('?')[0] === href?.split('?')[0]) {
        return (
            <button
                type="button"
                onClick={() => {
                    const url = new URL(window.location.href?.split('?')[0] + '?' + href.split('?')[1]);
                    history.pushState({}, '', url);
                    window.location.reload();
                }}
                className={allClassNames}
                aria-label={alt}
            >
                {children}
            </button>
        );
    }

    return (
        <Link
            href={href + (anchor ? `#${anchor}` : '')}
            openInNewTab={openInNewTab}
            alt={alt}
            className={allClassNames}
        >
            {children}
        </Link>
    );
};

export { MenuLink };
