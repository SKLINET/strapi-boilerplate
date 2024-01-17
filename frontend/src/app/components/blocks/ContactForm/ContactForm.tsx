import React, { ReactElement } from 'react';
import styles from './ContactForm.module.scss';
import { ContactFormBlockProps } from '../../../blocks/ContactFormBlock/ContactFormBlock';
import { ContactForm as _ContactForm } from '../../organisms/ContactForm/ContactForm';

const ContactForm = ({ blocksData: { title }, app }: ContactFormBlockProps): ReactElement => {
    return (
        <section className={styles.wrapper}>
            <h2>{title}</h2>
            <_ContactForm app={app} className={styles.form} />
        </section>
    );
};

export { ContactForm };
