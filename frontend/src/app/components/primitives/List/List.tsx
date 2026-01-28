import { ReactElement } from 'react';
import styles from './List.module.scss';
import clsx from 'clsx';

export interface ListProps {
    tag: 'ol' | 'ul';
    children: ReactElement[] | ReactElement | string;
}

const List = ({ tag, children }: ListProps): ReactElement => {
    const Tag = tag;
    return <Tag className={clsx(styles.list, styles[tag])}>{children}</Tag>;
};

List.whyDidYouRender = true;

export { List };
