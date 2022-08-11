import React, { ReactElement } from 'react';
import { LinkTarget } from '../../../types/linkTarget';
import { MenuItem } from '../../../types/menu';
import { MenuLink } from '../../primitives/MenuLink/MenuLink';
import styles from './MainMenu.module.scss';

interface MainMenuProps {
    menu: readonly MenuItem[];
}

function renderMenu(menuItems: readonly MenuItem[]): ReactElement {
    return (
        <ul className={styles.topMenu}>
            {menuItems.map((item, i) => (
                <li key={i}>
                    <MenuLink
                        href={item?.page?.data?.attributes?.url ? item?.page?.data?.attributes?.url : item?.externalUrl}
                        target={(item?.target as LinkTarget) || '_self'}
                    >
                        {item.title}
                    </MenuLink>
                </li>
            ))}
        </ul>
    );
}

const MainMenu = ({ menu }: MainMenuProps): ReactElement => renderMenu(menu);

MainMenu.whyDidYouRender = true;

export { MainMenu };
