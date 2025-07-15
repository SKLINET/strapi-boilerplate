import React, { CSSProperties, ReactElement, ReactNode } from 'react';
import styles from './Text.module.scss';
import clsx from 'clsx';
import { nbsp } from '../../../../utils/nbsp';

export interface TextProps {
    children: ReactNode;
    tag?: 'p' | 'span';
    // color?: ...;
    // weight?: ...;
    // size?: ...;
    className?: string;
    style?: CSSProperties;
}

const Text = ({ children, tag = 'p', /* color, weight, size, */ className, style }: TextProps): ReactElement => {
    const Tag = tag;

    return (
        <Tag
            className={clsx(
                styles.wrapper,
                // color && styles[color],
                // weight && styles[weight],
                // size && styles[size],

                className,
            )}
            style={style}
        >
            {typeof children === 'string' ? nbsp(children) : children}
        </Tag>
    );
};

export { Text };
