import React, { ReactElement } from 'react';
import styles from './IconButton.module.scss';
import clsx from 'clsx';
import { Icon, Icons } from '../../primitives/Icon/Icon';

interface IconButtonProps {
    onClick: () => void;
    alt: string;
    icon: Icons;
    type: 'fill' | 'outline';
    color: 'black';
    size?: 'large';
    disabled?: boolean;
    className?: string;
}

const IconButton = ({
    onClick,
    alt,
    icon,
    type,
    color,
    size = 'large',
    disabled = false,
    className,
}: IconButtonProps): ReactElement => (
    <button
        type="button"
        onClick={onClick}
        aria-label={alt}
        disabled={disabled}
        className={clsx(styles.wrapper, styles[type], styles[color], styles[size], className)}
    >
        <Icon name={icon} className={styles.icon} />
    </button>
);

export { IconButton };
