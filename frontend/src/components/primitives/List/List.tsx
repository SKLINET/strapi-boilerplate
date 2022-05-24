import React, { ReactElement } from 'react';
import clsx from 'clsx';
import styles from './List.module.scss';

export interface ListProps {
    tag: 'ol' | 'ul';
    children: ReactElement[] | ReactElement | string;
}

const List = ({ tag, children }: ListProps): JSX.Element => {
    const Tag = tag;
    return <Tag className={clsx(styles.list, styles[tag])}>{children}</Tag>;
};

List.whyDidYouRender = true;

export { List };
