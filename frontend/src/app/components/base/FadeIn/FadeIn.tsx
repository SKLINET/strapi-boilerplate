'use client';

import React, { ReactElement, ReactNode, useRef } from 'react';
import styles from './FadeIn.module.scss';
import clsx from 'clsx';
import { useIsVisible } from '../../../../utils/hooks/useIsVisible';
import { WidthLimiter } from '../WidthLimiter/WidthLimiter';
import { ITriggerPosition } from '../../../../utils/hooks/useOnScroll';

interface FadeInProps {
    tag?: 'section' | 'footer' | 'div';
    children: ReactNode;
    spaceing?: {
        x?: 'base' | 'offset';
        y?: {
            top?: 'small' | 'large';
            bottom?: 'small' | 'large';
        };
    };
    backgroundEl?: ReactNode;
    background?: 'black' | 'white';
    className?: string;
    innerClassName?: string;
    contentClassName?: string;
    anchor?: string | null;
    withLimiter?: boolean;
    triggerPosition?: ITriggerPosition;
}

const FadeIn = ({
    tag = 'section',
    children,
    spaceing,
    backgroundEl,
    background = 'white',
    className,
    innerClassName,
    contentClassName,
    anchor,
    withLimiter = false,
    triggerPosition,
}: FadeInProps): ReactElement => {
    const ref = useRef(null);

    const { isVisible } = useIsVisible(ref, triggerPosition);

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
            className={clsx(
                styles.wrapper,
                isVisible && styles.isVisible,
                styles[background],
                spaceing?.x && styles[spaceing.x],
                spaceing?.y?.top && styles['top-' + spaceing.y.top],
                spaceing?.y?.bottom && styles['bottom-' + spaceing.y.bottom],
                className,
            )}
            ref={ref}
            id={anchor || undefined}
        >
            {backgroundEl}
            {renderInner(renderContent(children))}
        </Tag>
    );
};

export { FadeIn };
