'use client';

import React, { ReactElement, ReactNode, useRef } from 'react';
import styles from './FadeIn.module.scss';
import clsx from 'clsx';
import { useIsVisible } from '../../../../utils/hooks/useIsVisible';
import { WidthLimiter } from '../WidthLimiter/WidthLimiter';

interface FadeInProps {
    tag?: 'section' | 'footer' | 'div';
    children: ReactNode;
    className?: string;
    innerClassName?: string;
    contentClassName?: string;
    anchor?: string | null;
    withLimiter?: boolean;
}

const FadeIn = ({
    tag = 'section',
    children,
    className,
    innerClassName,
    contentClassName,
    anchor,
    withLimiter = false,
}: FadeInProps): ReactElement => {
    const ref = useRef(null);

    const { isVisible } = useIsVisible(ref);

    // First element
    const Tag = tag;

    // Second element
    const renderInner = (children: ReactNode) => {
        const Tag = withLimiter ? WidthLimiter : 'div';

        return innerClassName || withLimiter ? (
            <Tag className={clsx(styles.inner, innerClassName)}>{children}</Tag>
        ) : (
            children
        );
    };

    // Third element
    const renderContent = (children: ReactNode) => (
        <div className={clsx(styles.content, contentClassName)}>{children}</div>
    );

    return (
        <Tag
            className={clsx(styles.wrapper, isVisible && styles.isVisible, className)}
            ref={ref}
            id={anchor || undefined}
        >
            {renderInner(renderContent(children))}
        </Tag>
    );
};

export { FadeIn };
