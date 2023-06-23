import React, { AnchorHTMLAttributes, memo } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import { UrlObject } from 'url';
import { nbsp } from '@symbio/headless/utils';
import { getPageUrl } from '../../../utils/getPageUrl';

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
    Partial<NextLinkProps> & {
        href?: string | UrlObject;
        page?: any; // ** TODO ** Fix page any
        params?: Record<string, string | number> | ParsedUrlQuery;
        plain?: boolean;
    };

const _Link = ({ className, href, page, locale, children, target, plain, ...rest }: LinkProps): JSX.Element => {
    let realHref = '';

    if (typeof href === 'string') {
        if (!children) {
            throw new Error('Link with href without children!');
        }
        realHref = href;
    } else if (page) {
        realHref = getPageUrl(page?.data?.attributes?.url || '');
    }

    const attrs = {
        className,
        title: page?.data?.attributes?.title || undefined,
        ...rest,
    };

    const realChildren = children || page?.data?.attributes?.title;

    if (plain || (realHref && realHref.startsWith('http')) || target === '_blank') {
        return (
            <a href={realHref} {...attrs} target={target}>
                {typeof realChildren === 'string' ? nbsp(realChildren) : realChildren}
            </a>
        );
    }

    return (
        <NextLink
            href={'/[[...slug]]'}
            as={realHref}
            locale={locale || ''}
            passHref
            {...attrs}
            {...rest}
            target={target}
            onClick={(e) => {
                if (typeof attrs.onClick === 'function') {
                    return attrs.onClick(e);
                }
                return true;
            }}
        >
            {typeof realChildren === 'string' ? nbsp(realChildren) : realChildren}
        </NextLink>
    );
};

_Link.whyDidYouRender = true;

export const Link = memo(_Link);
