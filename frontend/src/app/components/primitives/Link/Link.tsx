import React, { ReactElement, ReactNode } from 'react';
import NextLink from 'next/link';
import { nbsp } from '../../../../utils/nbsp';

export interface LinkProps {
    children?: ReactNode;
    alt?: string | null;
    href: string;
    openInNewTab?: boolean;
    prefetch?: boolean;
    download?: boolean;
    className?: string;
}

const Link = ({
    children,
    alt,
    href,
    openInNewTab = false,
    prefetch = false,
    download = false,
    className,
}: LinkProps): ReactElement => {
    const _children = typeof children === 'string' ? nbsp(children) : children;
    const _target = openInNewTab ? '_blank' : '_self';

    const _alt = alt || (typeof children === 'string' ? children : '');

    if (_alt.length === 0) {
        console.error('⚠️  Missing alt for link');
    }

    if (href.startsWith('mailto') || href.startsWith('tel') || href.startsWith('http') || href.startsWith('https')) {
        return (
            <a href={href} target={_target} className={className} aria-label={_alt} download={download}>
                {_children}
            </a>
        );
    }

    return (
        <NextLink
            href={href}
            target={_target}
            prefetch={prefetch}
            className={className}
            aria-label={_alt}
            download={download}
        >
            {_children}
        </NextLink>
    );
};

export { Link };
