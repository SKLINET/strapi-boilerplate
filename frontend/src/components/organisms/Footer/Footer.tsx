import React, { ReactElement } from 'react';
import { MainMenu } from '../MainMenu/MainMenu';
import { IApp } from '../../../types/app';
import { getMenuType } from '../../../utils/strapi/getMenuType';

interface FooterProps {
    app: IApp;
}

const Footer = ({ app }: FooterProps): ReactElement => {
    const menu = getMenuType(app?.webSetting?.data?.attributes?.footerMenu?.data);

    return (
        <div className=" w-full flex items-center flex-row justify-center text-white bg-black p-10 h-20">
            {menu && <MainMenu menu={menu} />}
        </div>
    );
};

Footer.whyDidYouRender = true;

export { Footer };
