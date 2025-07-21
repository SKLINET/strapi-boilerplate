import React, { ReactElement } from 'react';
import styles from './SocialButton.module.scss';
import clsx from 'clsx';
import { Link } from '../../primitives/Link/Link';
import { Icon } from '../../primitives/Icon/Icon';
import { getSystemResource } from '../../../../utils/strapi/getSystemResource';
import { IApp } from '../../../../types/base/app';

interface SocialButtonProps {
    type: 'facebook' | 'instagram';
    href: string;
    app: IApp;
    className?: string;
}

const SocialButton = ({ type, href, app, className }: SocialButtonProps): ReactElement => (
    <Link
        href={href}
        openInNewTab
        alt={getSystemResource('go_to_value', app?.systemResources).replace('{value}', type)}
        className={clsx(styles.wrapper, className)}
    >
        <Icon name={type} className={styles.icon} />
    </Link>
);

export { SocialButton };
