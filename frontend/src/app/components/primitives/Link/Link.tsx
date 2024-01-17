import React, { ReactElement, ReactNode } from 'react';
import NextLink from 'next/link';
import { nbsp } from '../../../../utils/nbsp';

interface LinkProps {
    children: ReactNode;
    href: string;
    openInNewTab?: boolean;
    className?: string;
}

const Link = ({ children, href, openInNewTab = false, className }: LinkProps): ReactElement => {
    const _children = typeof children === 'string' ? nbsp(children) : children;
    const _target = openInNewTab ? '_blank' : '_self';

    if (href.startsWith('mailto') || href.startsWith('tel') || href.startsWith('http') || href.startsWith('https')) {
        return (
            <a href={href} target={_target} className={className}>
                {_children}
            </a>
        );
    }

    return (
        <NextLink href={href} target={_target} className={className}>
            {_children}
        </NextLink>
    );
};

export { Link };
