import React, { ReactElement } from 'react';
import styles from './Navbar.module.scss';
import { IApp } from '../../../../types/base/app';
import { getMenuType } from '../../../../utils/strapi/getMenuType';
import { LanguageSelector } from '../../molecules/LanguageSelector/LanguageSelector';
import { MenuLink } from './MenuLink/MenuLink';
import { Logo } from '../../molecules/Logo/Logo';
import { SocialButton } from '../../molecules/SocialButton/SocialButton';

interface NavbarProps {
    app: IApp;
}

const Navbar = ({ app }: NavbarProps): ReactElement => {
    const menu = getMenuType(app.webSetting?.mainMenu, app);

    return (
        <header className={styles.wrapper}>
            <Logo app={app} className={styles.logo} />
            {menu?.items.map((e) => <MenuLink key={e.id} data={e} />)}
            <LanguageSelector app={app} />
            <div className={styles.socials}>
                <SocialButton type="facebook" href="https://www.facebook.com" app={app} />
                <SocialButton type="instagram" href="https://www.instagram.com" app={app} />
            </div>
        </header>
    );
};

export { Navbar };
