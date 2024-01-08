import React, { ReactElement, ReactNode } from 'react';
import { IApp } from '../../../../types/app';
import { Navbar } from '../../organisms/Navbar/Navbar';
import { Footer } from '../../organisms/Footer/Footer';

interface LayoutProps {
    app: IApp;
    children: ReactNode;
}

const Layout = ({ app, children }: LayoutProps): ReactElement => (
    <>
        <Navbar app={app} />
        <main>{children}</main>
        <Footer app={app} />
    </>
);

export { Layout };
