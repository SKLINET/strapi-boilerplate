import { ReactElement, Suspense } from 'react';
import styles from './Navbar.module.scss';
import { IApp } from '../../../../types/base/app';
import { getMenuType } from '../../../../utils/strapi/getMenuType';
import { LanguageSelector } from '../../molecules/LanguageSelector/LanguageSelector';
import { MenuLink } from './MenuLink/MenuLink';
import { Logo } from '../../molecules/Logo/Logo';

interface NavbarProps {
    app: IApp;
}

const Navbar = ({ app }: NavbarProps): ReactElement => {
    const menu = getMenuType(app.webSetting?.mainMenu, app);

    return (
        <header className={styles.wrapper}>
            <Logo app={app} className={styles.logo} />
            {menu?.items.map((e) => (
                <Suspense key={e.id} fallback={<div>Loading menu link...</div>}>
                    <MenuLink data={e} />
                </Suspense>
            ))}
            <LanguageSelector app={app} />
        </header>
    );
};

export { Navbar };
