import React, { ReactElement, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { CustomCursor } from '../../primitives/CustomCursor/CustomCursor';
import { DefaultCursor } from '../../cursors/DefaultCursor/DefaultCursor';
import { NavbarProps } from '../../organisms/Navbar/Navbar';
import { FooterProps } from '../../organisms/Footer/Footer';

const Navbar = dynamic(() => import('../../organisms/Navbar/Navbar').then((mod) => mod.Navbar));
const Footer = dynamic(() => import('../../organisms/Footer/Footer').then((mod) => mod.Footer));

interface LayoutProps {
    navbarData: NavbarProps;
    footerData: FooterProps;
    children: ReactNode;
}

const LayoutComponent = ({ navbarData, footerData, children }: LayoutProps): ReactElement | null => {
    return (
        <CustomCursor component={<DefaultCursor />}>
            {(ref) => (
                <>
                    <Navbar {...navbarData} />
                    <div ref={ref}>{children}</div>
                    <Footer {...footerData} />
                </>
            )}
        </CustomCursor>
    );
};

export const Layout = LayoutComponent;
