import React, { ReactElement } from 'react';
import { Link } from '../../primitives/Link/Link';
import styles from './MainMenu.module.scss';

function renderMenu(menu: any, level = 1): ReactElement {
    return (
        <ul className={styles['menu' + level]}>
            {menu?.links.map((link: any, i: number) => (
                <li key={`Mainmenu_${i}`} className="mr-4">
                    {link.__typename === 'PageRecord' && <Link page={link} />}
                    {link.__typename === 'MenuRecord' && renderMenu(link, level + 1)}
                </li>
            ))}
        </ul>
    );
}

const MainMenu = ({ menu }: any): ReactElement => renderMenu(menu, 1);

MainMenu.whyDidYouRender = true;

export { MainMenu };
