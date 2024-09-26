import React, { ReactElement } from 'react';
import styles from './Navbar.module.scss';
import { IApp } from '../../../../types/base/app';
import { Link } from '../../primitives/Link/Link';
import { getMenuType } from '../../../../utils/strapi/getMenuType';
import { LanguageSelector } from '../../molecules/LanguageSelector/LanguageSelector';

interface NavbarProps {
    app: IApp;
}

const Navbar = ({ app }: NavbarProps): ReactElement => {
    const menu = getMenuType(app.webSetting?.mainMenu, app);

    return (
        <header className={styles.wrapper}>
            {menu?.items.map((e) => (
                <Link key={e.id} href={e.href} openInNewTab={e.openInNewTab} className={styles.link} alt={e.label}>
                    {e.label}
                </Link>
            ))}
            <LanguageSelector app={app} />
        </header>
    );
};

export { Navbar };
