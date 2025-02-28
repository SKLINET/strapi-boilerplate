import React, { ReactElement } from 'react';
import { graphql } from 'relay-runtime';
import { ContactFormBlock_content$data } from './__generated__/ContactFormBlock_content.graphql';
import { ContactForm } from '../../components/blocks/ContactForm/ContactForm';
import { IApp } from '../../../types/base/app';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ContactFormBlockStaticProps {}

export interface ContactFormBlockContent extends Omit<ContactFormBlock_content$data, ' $fragmentType'> {
    __typename: 'ComponentBlockContactFormBlock';
}

export interface ContactFormBlockProps extends ContactFormBlockStaticProps {
    blocksData: Omit<ContactFormBlockContent, ' $fragmentType'>;
    app: IApp;
    className?: string;
}

graphql`
    fragment ContactFormBlock_content on ComponentBlockContactFormBlock {
        id
        title
    }
`;

const ContactFormBlock = (props: ContactFormBlockProps): ReactElement => <ContactForm {...props} />;

export default ContactFormBlock;
