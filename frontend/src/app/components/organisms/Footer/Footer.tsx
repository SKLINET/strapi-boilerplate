import { ReactElement } from 'react';
import styles from './Footer.module.scss';
import { IApp } from '../../../../types/base/app';
import { FadeIn } from '../../base/FadeIn/FadeIn';
import { CurrentYear } from '../../molecules/CurrentYear/CurrentYear';

interface FooterProps {
    app: IApp;
}

const Footer = async ({ app }: FooterProps): Promise<ReactElement> => {
    return (
        <FadeIn tag="footer" triggerPosition="bottom" className={styles.wrapper} contentClassName={styles.content}>
            <>
                © Sklinet <CurrentYear />
            </>
        </FadeIn>
    );
};

export { Footer };
