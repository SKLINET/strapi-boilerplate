import React, { ReactElement } from 'react';
import styles from './ContactForm.module.scss';
import { ContactFormBlockProps } from '../../../blocks/ContactFormBlock/ContactFormBlock';
import { ContactForm as _ContactForm } from '../../organisms/ContactForm/ContactForm';
import { Heading } from '../../primitives/Heading/Heading';

const ContactForm = ({ blocksData: { title }, app }: ContactFormBlockProps): ReactElement => {
    return (
        <section className={styles.wrapper}>
            <Heading tag="h2">{title}</Heading>
            <_ContactForm app={app} className={styles.form} />
        </section>
    );
};

export { ContactForm };
