import React, { ReactElement, useState } from 'react';
import config from '../../../../sklinet.config.json';
import { useRouter } from 'next/router';
import { IMenu } from '../../../types/menu';
import { MainMenu } from '../MainMenu/MainMenu';
import { Link } from '../../primitives/Link/Link';

export interface NavbarProps {
    menu: IMenu | null;
}

const Navbar = ({ menu }: NavbarProps): ReactElement<null, 'div'> | null => {
    const { locale, locales } = useRouter();

    const [languageSelectorOpen, setLanguageSelectorOpen] = useState<boolean>(false);

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

Navbar.whyDidYouRender = config.whyDidYouRender.active;

export { Navbar };
