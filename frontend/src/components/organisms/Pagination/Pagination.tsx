import React, { ReactElement } from 'react';
import styles from './Pagination.module.scss';
import clsx from 'clsx';
import { Link } from '../../primitives/Link/Link';

export interface PaginationProps {
    page?: number;
    total?: number;
    className?: string;
    callback: (page: number) => void;
}

function renderPagination(page: number, total: number, callback: (page: number) => void): ReactElement[] {
    const result = [];
    let start = Math.max(page - 2, 1);
    const end = Math.min(start + 5, total);
    start = Math.max(Math.min(end - 5, start), 1);
    for (let p = start; p <= end; p++) {
        if (p === page) {
            result.push(
                <li key={`PaginationItem-${p}`} className={clsx(styles.linkItem, styles.linkItemActive)}>
                    {p}
                </li>,
            );
        } else {
            result.push(
                <li key={`PaginationItem-${p}`} className={styles.linkItem}>
                    <Link
                        href={'?page=' + p}
                        onClick={(e): void => {
                            e.preventDefault();
                            callback(p);
                        }}
                    >
                        {p}
                    </Link>
                </li>,
            );
        }
    }
    return result;
}

const Pagination = ({ className, page = 1, total = 0, callback }: PaginationProps): ReactElement | null => {
    if (total <= 1) {
        return null;
    }

    return (
        <div
            className={`flex flex-col justify-end my-10 mx-0 mobile-landscape:flex-row mobile-landscape:items-center ${className}`}
        >
            {/*<Button btnType={'secondary'} small onClick={(): void => console.log('load')}>
                Načíst další
            </Button>*/}
            <ul className="flex items-center justify-center mt-6 mobile-landscape:mt-0 mobile-landscape:ml-20">
                {renderPagination(page, total, callback)}
            </ul>
        </div>
    );
};

Pagination.whyDidYouRender = true;

export { Pagination };
