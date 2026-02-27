'use client';

import { ReactElement } from 'react';
import { IMenuItem } from '../../../../types/menu';

interface CookiebotLinkProps {
    data: IMenuItem;
    className?: string;
}

const CookiebotLink = ({ data: { label }, className }: CookiebotLinkProps): ReactElement => {
    const onClick = () => {
        if (typeof window === 'undefined') return;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (typeof window.Cookiebot?.renew === 'function') {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.Cookiebot.renew();
        }
    };

    return (
        <button type="button" onClick={onClick} aria-label={label} className={className}>
            {label}
        </button>
    );
};

export { CookiebotLink };
