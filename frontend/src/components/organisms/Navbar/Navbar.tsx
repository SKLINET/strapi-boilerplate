import React, { ReactElement, useState } from 'react';
import { MainMenu } from '../MainMenu/MainMenu';
import { Link } from '../../primitives/Link/Link';
import { IApp } from '../../../types/app';
import { useRouter } from 'next/router';
import { getMenuType } from '../../../utils/strapi/getMenuType';

interface NavbarProps {
    app: IApp;
}

const Navbar = ({ app }: NavbarProps): ReactElement => {
    const { locale, locales } = useRouter();

    const [languageSelectorOpen, setLanguageSelectorOpen] = useState<boolean>(false);

    const menu = getMenuType(app?.webSetting?.data?.attributes?.mainMenu?.data);

    return (
        <div className=" w-full flex items-center flex-row justify-center text-white bg-black p-10 h-20">
            {/*{logo && logo.width && logo.height && (*/}
            {/*    <Link page={homepage || undefined} className="h-12 w-12 self-center text-logo">*/}
            {/*        <Logo />*/}
            {/*    </Link>*/}
            {/*)}*/}
            {menu && <MainMenu menu={menu} />}
            {Array.isArray(locales) && locales.length > 1 ? (
                <div className="relative uppercase text-base">
                    {locale}
                    <span
                        className="ml-2 w-3 h-3 inline-block bg-transparent cursor-pointer border-2 border-solid border-white transform rotate-45"
                        onClick={(): void => setLanguageSelectorOpen(!languageSelectorOpen)}
                    />
                    {languageSelectorOpen && (
                        <ul className="absolute flex bg-black m-0 p-4 justify-items-center flex-column border-2 border-solid border-white z-10">
                            {locales.map(
                                (loc: string, i: number) =>
                                    loc !== locale && (
                                        <li key={`LanguageSelector_${i}`} className="list-none">
                                            <Link href="" locale={loc} onClick={() => setLanguageSelectorOpen(false)}>
                                                {loc}
                                            </Link>
                                        </li>
                                    ),
                            )}
                        </ul>
                    )}
                </div>
            ) : (
                <span />
            )}
        </div>
    );
};

Navbar.whyDidYouRender = true;

export { Navbar };
