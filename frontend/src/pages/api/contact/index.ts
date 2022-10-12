/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import busboy from 'busboy';
import { commitMutation, fetchQuery } from 'relay-runtime';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { appQuery, appQueryResponse } from '../../../relay/__generated__/appQuery.graphql';
import { AppQuery } from '../../../relay/app';
import { createRelayEnvironment } from '../../../relay/createRelayEnvironment';
import { FormMutation } from '../../../relay/api/contact';
import { contactMutation } from '../../../relay/api/__generated__/contactMutation.graphql';
import getPublicationState from '../../../utils/getPublicationState';

dotenv.config();

export default (req: NextApiRequest, res: NextApiResponse): void => {
    if (req.method == 'POST') {
        const bb = busboy({ headers: req.headers });
        const data: Record<string, string> = {};

        bb.on('field', function (fieldname, val) {
            data[fieldname] = val;
        });

        bb.on('close', async function () {
            if (!process.env.SMTP) {
                res.statusCode = 500;
                res.statusMessage = 'No SMTP found';
                res.end();
                return;
            }

            const environment = createRelayEnvironment({});
            await commitMutation<contactMutation>(environment, {
                mutation: FormMutation,
                variables: {
                    data: {
                        name: data.name,
                        city: data.city,
                        phone: data.phone,
                        email: data.email,
                        message: data.message,
                    },
                },
            });

            const { webSetting } = (await fetchQuery<appQuery>(environment, AppQuery, {
                publicationState: getPublicationState(req.preview),
                locale: data.locale || 'cs',
            }).toPromise()) as appQueryResponse;

            const transporter = nodemailer.createTransport(process.env.SMTP || '');

            const plainContent = `${webSetting?.data?.attributes?.mailSubject || ''}
            \n\nMeno a priezvisko: ${data.name || ''}
            \n\nMesto: ${data.city || ''}
            \n\nTelefón: ${data.phone || ''}
            \n\nE-mail: ${data.email || ''}
            \n\nText správy: ${data.message || ''}
            `;

            const message = {
                from: webSetting?.data?.attributes?.mailFrom || '',
                to: webSetting?.data?.attributes?.mailTo || '', // list of receivers
                subject: webSetting?.data?.attributes?.mailSubject || '', // Subject line
                text: plainContent, // plain text body
                html: `<p><strong>Meno a priezvisko: </strong>${data?.name || ''}<br/><strong>Mesto:</strong> ${
                    data?.city || ''
                }<br/><strong>E-mail:</strong> ${data?.email || ''}<br/><strong>Telefón: </strong>${
                    data?.phone || ''
                }<br/><strong>Text správy: </strong>${data?.message || ''}<br/></p>`,
            };
            try {
                await transporter.sendMail(message);
                console.log('Message to ' + message.to + ' successfully sent');
            } catch (e) {
                console.log(e);
            }

            return res.send({
                success: true,
            });
        });

        req.pipe(bb);
        bb.write(req.body);
    }
};
