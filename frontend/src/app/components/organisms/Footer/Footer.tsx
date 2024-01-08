import React, { ReactElement } from 'react';
import styles from './Footer.module.scss';
import { IApp } from '../../../..//types/app';

interface FooterProps {
    app: IApp;
}

const Footer = ({ app }: FooterProps): ReactElement => {
    const currentYear = new Date().getFullYear().toString();

    return (
        <footer className={styles.wrapper}>
            <>© Sklinet {currentYear}</>
        </footer>
    );
};

export { Footer };
