import React, { ReactElement } from 'react';
import styles from './ContactForm.module.scss';
import { ContactFormBlockProps } from '../../../blocks/ContactFormBlock/ContactFormBlock';
import { ContactForm as _ContactForm } from '../../organisms/ContactForm/ContactForm';
import { Heading } from '../../primitives/Heading/Heading';
import { FadeIn } from '../../base/FadeIn/FadeIn';

const ContactForm = ({ blocksData: { title }, app }: ContactFormBlockProps): ReactElement => {
    return (
        <FadeIn className={styles.wrapper}>
            <Heading tag="h2">{title}</Heading>
            <_ContactForm app={app} className={styles.form} />
        </FadeIn>
    );
};

export { ContactForm };
