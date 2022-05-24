import React, { AnchorHTMLAttributes, memo } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import { UrlObject } from 'url';
import { Page } from '../../../types/page';
import { nbsp } from '@symbio/headless/utils';
import { getPageUrl } from '../../../utils/getPageUrl';

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
    Partial<NextLinkProps> & {
        href?: string | UrlObject;
        page?: Pick<Page, 'id' | 'url' | 'title'>;
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
        realHref = getPageUrl(page?.url);
    }

    const attrs = {
        className,
        title: page?.title || undefined,
        ...rest,
    };

    const realChildren = children || page?.title;

    if (plain || (realHref && realHref.startsWith('http')) || target === '_blank') {
        return (
            <a href={realHref} {...attrs}>
                {typeof realChildren === 'string' ? nbsp(realChildren) : realChildren}
            </a>
        );
    }

    return (
        <NextLink href={'/[[...slug]]'} as={realHref} locale={locale} passHref>
            <a
                {...attrs}
                {...rest}
                onClick={(e) => {
                    if (typeof attrs.onClick === 'function') {
                        return attrs.onClick(e);
                    }
                    return true;
                }}
            >
                {typeof realChildren === 'string' ? nbsp(realChildren) : realChildren}
            </a>
        </NextLink>
    );
};

_Link.whyDidYouRender = true;

export const Link = memo(_Link);
