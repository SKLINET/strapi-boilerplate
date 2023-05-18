import React, { ReactElement } from 'react';
import styles from './List.module.scss';
import clsx from 'clsx';
import config from '../../../../sklinet.config.json';

export interface ListProps {
    tag: 'ol' | 'ul';
    children: ReactElement[] | ReactElement | string;
}

const List = ({ tag, children }: ListProps): JSX.Element => {
    const Tag = tag;
    return <Tag className={clsx(styles.list, styles[tag])}>{children}</Tag>;
};

List.whyDidYouRender = config.whyDidYouRender.active;

export { List };
