import React, { ReactElement, ReactNode } from 'react';
import styles from './Heading.module.scss';
import clsx from 'clsx';
import { nbsp } from '../../../../utils/nbsp';
import { RichText } from '../RichText/RichText';

export interface HeadingProps {
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    size?: 'xl' | 'lg' | 'md' | 'sm';
    color?: 'black' | 'white';
    children: ReactNode;
    withoutAutosize?: boolean;
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
        case 'h5':
        case 'h6':
            return 'sm';
        default:
            return 'md';
    }
};

const Heading = ({ tag, size, color, children, withoutAutosize = false, className }: HeadingProps): ReactElement => {
    const Tag = tag;

    return (
        <Tag
            className={clsx(
                styles.wrapper,
                !withoutAutosize && styles.useSizes,
                styles[size ? size : getSizeFromTag(tag)],
                color && styles[color],
                className,
            )}
        >
            {typeof children === 'string' ? (
                children.includes('<b>') ? (
                    <RichText content={children} />
                ) : (
                    nbsp(children)
                )
            ) : (
                children
            )}
        </Tag>
    );
};

export { Heading };
