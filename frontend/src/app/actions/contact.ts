'use server';

import { commitMutation } from 'relay-runtime';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { createRelayEnvironment } from '../../relay/createRelayEnvironment';
import { FormMutation } from '../../relay/api/contact';
import { contactMutation } from '../../relay/api/__generated__/contactMutation.graphql';
import { IApp } from '../../types/app';
import { ContactFormData } from '../components/organisms/ContactForm/ContactForm';

dotenv.config();

export const contactAction = async (data: ContactFormData, app: IApp): Promise<boolean> => {
    try {
        const environment = createRelayEnvironment({});
        await commitMutation<contactMutation>(environment, {
            mutation: FormMutation,
            variables: {
                data: {
                    name: data.name,
                    company: data.company,
                    email: data.email,
                    phone: data.phoneNumber,
                    message: data.message,
                },
            },
        });

        const mailFrom = app?.contactForm?.data?.attributes?.mailFrom || '';
        const mailTo = app?.contactForm?.data?.attributes?.mailTo || '';
        const mailSubject = app?.contactForm?.data?.attributes?.mailSubject || '';

        try {
            const transporter = nodemailer.createTransport(process.env.SMTP || '');

            const plainContent = `${mailSubject}
            \n\nJméno: ${data.name || ''}
            \n\nSpolečnost: ${data.company || ''}
            \n\nE-mail: ${data.email || ''}
            \n\nMobilní číslo: ${data.phoneNumber || ''}
            \n\nText zprávy: ${data.message || ''}
            `;

            const message = {
                from: mailFrom,
                to: mailTo, // list of receivers
                subject: mailSubject, // Subject line
                text: plainContent, // plain text body
                html: `<p><strong>Jméno: </strong>${data.name || ''}<br/><strong>Společnost:</strong> ${
                    data.company || ''
                }<br/><strong>E-mail:</strong> ${data.email || ''}<br/><strong>Mobilní číslo: </strong>${
                    data.phoneNumber || ''
                }<br/><strong>Text zprávy: </strong>${data.message || ''}<br/></p>`,
            };
            await transporter.sendMail(message);

            console.log('Message to ' + message.to + ' successfully sent');
        } catch (err) {
            console.log("Message didn't send!");
        }

        return true;
    } catch (err) {
        return false;
    }
};
