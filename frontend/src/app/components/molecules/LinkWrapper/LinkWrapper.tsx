import React, { ReactElement } from 'react';
import styles from './LinkWrapper.module.scss';
import clsx from 'clsx';
import { Link, LinkProps } from '../../primitives/Link/Link';

type LinkWrapperProps = LinkProps & { linkClassName?: string; contentClassName?: string };

const LinkWrapper = ({
    children,
    className,
    linkClassName,
    contentClassName,
    ...rest
}: LinkWrapperProps): ReactElement => (
    <div className={clsx(styles.wrapper, className)}>
        <Link {...rest} className={clsx(styles.link, linkClassName)} />
        <div className={clsx(styles.content, contentClassName)}>{children}</div>
    </div>
);

export { LinkWrapper };
