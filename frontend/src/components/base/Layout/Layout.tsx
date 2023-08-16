import React, { ReactElement, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { CustomCursor } from '../../primitives/CustomCursor/CustomCursor';
import { DefaultCursor } from '../../cursors/DefaultCursor/DefaultCursor';
import { IApp } from '../../../types/app';

const Navbar = dynamic(() => import('../../organisms/Navbar/Navbar').then((mod) => mod.Navbar));
const Footer = dynamic(() => import('../../organisms/Footer/Footer').then((mod) => mod.Footer));

interface LayoutProps {
    app: IApp;
    children: ReactNode;
}

const LayoutComponent = ({ app, children }: LayoutProps): ReactElement | null => {
    return (
        <CustomCursor component={<DefaultCursor />}>
            {(ref) => (
                <>
                    <Navbar app={app} />
                    <div ref={ref}>{children}</div>
                    <Footer app={app} />
                </>
            )}
        </CustomCursor>
    );
};

export const Layout = LayoutComponent;
