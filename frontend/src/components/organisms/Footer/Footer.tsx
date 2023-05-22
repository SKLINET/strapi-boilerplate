import React, { ReactElement } from 'react';
import config from '../../../../sklinet.config.json';
import { IMenu } from '../../../types/menu';
import { MainMenu } from '../MainMenu/MainMenu';

export interface FooterProps {
    menu: IMenu | null;
}

const Footer = ({ menu }: FooterProps): ReactElement<null, 'div'> | null => {
    return (
        <div className=" w-full flex items-center flex-row justify-center text-white bg-black p-10 h-20">
            {menu && <MainMenu menu={menu} />}
        </div>
    );
};

Footer.whyDidYouRender = config.whyDidYouRender.active;

export { Footer };
