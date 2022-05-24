import React, { ReactElement, ReactNode } from 'react';
import styles from './Table.module.scss';

export interface TableProps {
    readonly children: ReactNode;
}

const Table = ({ children }: TableProps): ReactElement<TableProps, 'div'> => {
    return (
        <div className={styles.overflowWrapper}>
            <table className={styles.table}>{children}</table>
        </div>
    );
};

Table.whyDidYouRender = true;

export { Table };
