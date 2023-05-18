import React, { ReactElement, ReactNode } from 'react';
import styles from './Heading.module.scss';
import clsx from 'clsx';
import { nbsp } from '../../../utils/nbsp';

export interface HeadingProps {
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
    children: ReactNode;
    className?: string;
}

export const getSizeFromTag = (tag: string): string => {
    switch (tag) {
        case 'h1':
            return 'xl';
        case 'h2':
            return 'lg';
        case 'h3':
            return 'md';
        case 'h4':
            return 'sm';
        case 'h5':
        case 'h6':
            return 'xs';
        default:
            return 'md';
    }
};

const Heading = ({ tag, size, className, children }: HeadingProps): ReactElement => {
    const Tag = tag;

    return (
        <Tag className={clsx(styles.wrapper, styles[size ? size : getSizeFromTag(tag)], className)}>
            {typeof children === 'string' ? nbsp(children) : children}
        </Tag>
    );
};

export { Heading };
