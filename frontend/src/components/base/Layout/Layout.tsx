import React, { ReactElement, ReactNode } from 'react';
import { CustomCursor } from '../../primitives/CustomCursor/CustomCursor';
import { DefaultCursor } from '../../cursors/DefaultCursor/DefaultCursor';

interface LayoutProps {
    children: ReactNode;
}

const LayoutComponent = ({ children }: LayoutProps): ReactElement | null => {
    return (
        <CustomCursor component={<DefaultCursor />}>
            {(ref) => (
                <div className={'mx-auto my-0 pt-20'} ref={ref}>
                    {children}
                </div>
            )}
        </CustomCursor>
    );
};

export const Layout = LayoutComponent;
