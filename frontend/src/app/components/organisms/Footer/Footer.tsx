import React, { ReactElement } from 'react';
import styles from './Footer.module.scss';
import { IApp } from '../../../../types/base/app';
import { FadeIn } from '../../base/FadeIn/FadeIn';

interface FooterProps {
    app: IApp;
}

const Footer = ({ app }: FooterProps): ReactElement => {
    const currentYear = new Date().getFullYear().toString();

    return (
        <FadeIn tag="footer" triggerPosition="bottom" className={styles.wrapper} contentClassName={styles.content}>
            <>© Sklinet {currentYear}</>
        </FadeIn>
    );
};

export { Footer };
