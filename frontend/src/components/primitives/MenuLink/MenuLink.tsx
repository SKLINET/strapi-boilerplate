import React, { ReactElement } from 'react';
import NextLink from 'next/link';
import cn from 'classnames';
import styles from './MenuLink.module.scss';
import { LinkTarget } from '../../../types/linkTarget';
import { getLinkTarget } from '../../../utils/getLinkTarget';

export interface LinkProps {
    children: string | ReactElement;
    href?: string;
    target?: LinkTarget;
    onClick?: () => void;
    plain?: boolean;
    primary?: boolean;
    blog?: boolean;
    inverse?: boolean;
    className?: string;
}

const MenuLink = ({ children, className, href, target = '_self', onClick }: LinkProps): ReactElement | null => {
    const renderLink = () => (
        <a
            href={href}
            target={getLinkTarget(target)}
            rel={'noreferrer'}
            className={cn(className)}
            onClick={() => {
                if (onClick) {
                    onClick();
                }
            }}
        >
            {children}
        </a>
    );
    if (href) {
        return <NextLink href={href}>{renderLink()}</NextLink>;
    } else if (onClick) {
        return renderLink();
    }
    return null;
};

export { MenuLink };
