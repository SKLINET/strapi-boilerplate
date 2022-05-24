import React, { ReactElement } from 'react';
import { Link } from '../../primitives/Link/Link';

export interface PageBoxProps {
    page: {
        __typename: 'PageRecord';
        id: string;
        title: string;
        url: string;
    };
    className?: string;
}

const PageBox = ({ page, className }: PageBoxProps): ReactElement => {
    return (
        <Link
            page={page}
            className={`h-32 p-6 border-solid border border-primary transition-all duration-300 hover:text-secondary hover:bg-primary ${className}`}
        >
            <strong className="text-base font-bold">{page.title}</strong>
        </Link>
    );
};

PageBox.whyDidYouRender = true;

export { PageBox };
