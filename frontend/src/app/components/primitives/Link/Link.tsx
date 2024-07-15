import React, { ReactElement, ReactNode } from 'react';
import NextLink from 'next/link';
import { nbsp } from '../../../../utils/nbsp';

interface LinkProps {
    children: ReactNode;
    alt: string;
    href: string;
    openInNewTab?: boolean;
    prefetch?: boolean;
    className?: string;
}

const Link = ({ children, alt, href, openInNewTab = false, prefetch = false, className }: LinkProps): ReactElement => {
    const _children = typeof children === 'string' ? nbsp(children) : children;
    const _target = openInNewTab ? '_blank' : '_self';

    if (href.startsWith('mailto') || href.startsWith('tel') || href.startsWith('http') || href.startsWith('https')) {
        return (
            <a href={href} target={_target} className={className} aria-label={alt}>
                {_children}
            </a>
        );
    }

    return (
        <NextLink href={href} target={_target} prefetch={prefetch} className={className} aria-label={alt}>
            {_children}
        </NextLink>
    );
};

export { Link };
