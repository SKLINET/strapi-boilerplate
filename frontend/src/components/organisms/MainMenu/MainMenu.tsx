import React, { ReactElement } from 'react';
import styles from './MainMenu.module.scss';
import { IMenu } from '../../../types/menu';
import { MenuLink } from '../../primitives/MenuLink/MenuLink';

interface MainMenuProps {
    menu: IMenu;
}

function renderMenu(menu: IMenu): ReactElement {
    return (
        <ul className={styles.topMenu}>
            {menu.items.map((item) => (
                <li key={item.id}>
                    <MenuLink href={item.href} target={item.openInNewTab ? '_blank' : '_self'}>
                        {item.label}
                    </MenuLink>
                </li>
            ))}
        </ul>
    );
}

const MainMenu = ({ menu }: MainMenuProps): ReactElement => renderMenu(menu);

MainMenu.whyDidYouRender = true;

export { MainMenu };
