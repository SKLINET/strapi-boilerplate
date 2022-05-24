import React, { ReactElement } from 'react';
import { ReactNode } from 'react';
import styles from './Heading.module.scss';

export interface HeadingProps {
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
    className?: string;
    children: ReactNode;
}

function getSizeFromTag(tag: string): string {
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
}

const Heading = ({
    tag,
    size,
    className,
    children,
}: HeadingProps): ReactElement<HeadingProps, HeadingProps['tag']> | null => {
    const CustomTag = tag;
    const realSize = size || getSizeFromTag(tag);
    const classes = [styles[realSize]];
    className && classes.push(className);
    classes.push(styles['heading']);

    return <CustomTag className={classes.join(' ')}>{children}</CustomTag>;
};

Heading.whyDidYouRender = true;

export { Heading };
