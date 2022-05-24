import React, { ReactElement, ReactNode } from 'react';
import clsx from 'clsx';

export interface BlockWrapperProps {
    children?: ReactNode;
    className?: string;
}

export const BlockWrapper = ({ children, className }: BlockWrapperProps): ReactElement | null => {
    if (children || (Array.isArray(children) && children.length > 0)) {
        return (
            <section
                className={clsx(
                    'flex justify-center items-center p-4 tablet:p-8 tablet-landscape:p-16 col-start-1 col-end-7 tablet:col-end-13 desktop:col-end-17',
                    className,
                )}
            >
                {children}
            </section>
        );
    }
    return null;
};
