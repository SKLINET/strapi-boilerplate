'use client';

import React, { ReactElement } from 'react';
import styles from './Logo.module.scss';
import clsx from 'clsx';
import { usePush } from '../../../../utils/hooks/usePush';
import { IApp } from '../../../../types/base/app';
import { getPageType } from '../../../../utils/strapi/getPageType';
import { getSystemResource } from '../../../../utils/strapi/getSystemResource';
import { Icon } from '../../primitives/Icon/Icon';

interface LogoProps {
    handleClick?: () => void;
    app: IApp;
    className?: string;
}

const Logo = ({ handleClick, app, className }: LogoProps): ReactElement => {
    const push = usePush();

    const onClick = () => {
        if (app.page?.documentId === app.webSetting?.homePage?.documentId) {
            handleClick && handleClick();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const homepage = getPageType(app.webSetting?.homePage, app);

            if (homepage) {
                push(homepage.href);
            }
        }
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className={clsx(styles.wrapper, className)}
            aria-label={getSystemResource('go_to_homepage', app.systemResources)}
        >
            <Icon name="sklinet-round" className={styles.logo} />
        </button>
    );
};

export { Logo };
