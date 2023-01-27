import React, { ReactElement } from 'react';
import NextLink from 'next/link';
import cn from 'classnames';
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
    return (
        <NextLink
            href={href || ''}
            rel={'noreferrer'}
            target={getLinkTarget(target)}
            onClick={() => {
                if (onClick) {
                    onClick();
                }
            }}
            className={cn(className)}
        >
            {children}
        </NextLink>
    );
};

export { MenuLink };
