import React, { ReactElement, ReactNode } from 'react';
import styles from './Button.module.scss';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import nbsp from '../../../utils/nbsp';
import { IconProps } from '../../primitives/Icon/Icon';
import { LinkProps } from '../Link/Link';

const Icon = dynamic<IconProps>(import('../../primitives/Icon/Icon').then((mod) => mod.Icon));
const Link = dynamic<LinkProps>(import('../Link/Link').then((mod) => mod.Link));

export type ButtonProps = {
    children: ReactNode;
    type?: 'primary' | 'secondary';
    loader?: boolean;
    stretchOnMobile?: boolean;
    className?: string;
} & (
    | {
          onClick: () => void;
          href?: never;
          openInNewTab?: never;
          submit?: never;
      }
    | {
          onClick?: never;
          href: string;
          openInNewTab?: boolean;
          submit?: never;
      }
    | {
          onClick?: never;
          href?: never;
          openInNewTab?: never;
          submit: true;
      }
    | {
          onClick?: never;
          href?: never;
          openInNewTab?: never;
          submit?: never;
      }
);

const Button = ({
    children,
    type = 'primary',
    loader = false,
    stretchOnMobile = false,
    onClick,
    href,
    openInNewTab = false,
    submit,
    className,
}: ButtonProps): ReactElement => {
    const allClassNames = clsx(
        styles.wrapper,
        styles[type],
        loader && styles.loading,
        stretchOnMobile && styles.stretchOnMobile,
        className,
    );

    const getContent = () => (
        <>
            <div className={styles.content}>
                {typeof children === 'string' ? <span>{nbsp(children)}</span> : children}
            </div>
            {loader && <Icon name="loader" className={styles.loader} />}
        </>
    );

    if (submit || onClick) {
        return (
            <button type={submit ? 'submit' : 'button'} onClick={onClick} className={allClassNames}>
                {getContent()}
            </button>
        );
    }

    if (href) {
        return (
            <Link href={href} className={allClassNames} target={openInNewTab ? '_blank' : undefined}>
                {getContent()}
            </Link>
        );
    }

    return <div className={allClassNames}>{getContent()}</div>;
};

Button.whyDidYouRender = true;

export { Button };
