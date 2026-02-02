import axios from 'axios';
import { createRelayEnvironment } from '../../../relay/createRelayEnvironment';
import { commitMutation } from 'relay-runtime';
import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import { FormMutation } from '../../../relay/api/contact';

interface RequestBody {
    formInfo: {
        sendEmail: Record<string, any>;
        asPath: string;
        withFiles: boolean;
    };
    formData: Record<string, any>;
    files: any;
}

export async function POST(req: NextRequest) {
    const body = await req.formData();
    try {
        const formInfo: RequestBody['formInfo'] = JSON.parse(body.get('formInfo')?.toString() || '');
        const formData: RequestBody['formData'] = JSON.parse(body.get('formData')?.toString() || '');

        const mutation = FormMutation;

        if (!mutation) {
            throw new Error('No mutation found');
        }

        let files = [];

        if (formInfo.withFiles) {
            const { data: fileRes } = await axios(`${String(process.env.API_BASE_PATH)}/api/upload`, {
                method: 'POST',
                headers: {
                    credentials: 'include',
                },
                data: body,
            });

            files = fileRes || [];
        }

        const environment = createRelayEnvironment({});

        const optionalTitle =
            Object.values(formData).find((value) => typeof value === 'string' && value.trim() !== '') || '';

        const promise = new Promise(async (resolve, reject) => {
            await commitMutation(environment, {
                mutation: mutation,
                variables: {
                    data: {
                        optionalTitle,
                        urlFrom: formInfo.asPath,
                        formData: formData,
                        date: new Date().toISOString(),
                        files: files.map((f: Record<string, any>) => f.id) || [],
                    },
                },
                onCompleted(response: Record<string, any>) {
                    if (!response) return reject({ success: false });

                    const { createContactMessage, createJobMessage, createRequestMessage, createOrderMessage } =
                        response;

                    if (
                        createContactMessage?.documentId ||
                        createJobMessage?.documentId ||
                        createRequestMessage?.documentId ||
                        createOrderMessage?.documentId
                    ) {
                        return resolve({
                            success: true,
                            data:
                                createContactMessage || createJobMessage || createRequestMessage || createOrderMessage,
                        });
                    } else {
                        return reject({ success: false });
                    }
                },
                onError(error) {
                    return reject({ success: false, error });
                },
            });
        });

        const promiseResult = await Promise.resolve(promise);

        if (formInfo?.sendEmail) {
            const { from, to, subject } = formInfo.sendEmail;

            try {
                const transporter = nodemailer.createTransport(process.env.SMTP || '');

                let plainContent = `${subject}\n\n`;
                let htmlContent = ``;

                for (const [key, value] of Object.entries(formData)) {
                    let displayValue: string;
                    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                        displayValue = String(value);
                    } else if (Array.isArray(value)) {
                        displayValue = value.map((v) => String(v)).join(', ');
                    } else {
                        displayValue = JSON.stringify(value || '');
                    }

                    plainContent += `\n\n${key}: ${displayValue}`;
                    htmlContent += `<p><strong>${key}: </strong>${displayValue}</p>`;
                }

                const message = {
                    from: from,
                    to: to, // list of receivers
                    subject: subject, // Subject line
                    text: plainContent, // plain text body
                    html: htmlContent, // html body
                    attachments:
                        files?.map((f: Record<string, any>) => ({
                            filename: f.name || '',
                            path: f.url || '',
                        })) || [],
                };

                await transporter.sendMail(message);

                console.log('Message to ' + message.to + ' successfully sent');
            } catch (err) {
                console.log("Message didn't send!");
            }
        }

        return Response.json(promiseResult, { status: 200 });
    } catch (e) {
        console.log('ERR', e);
        return Response.json({ success: false }, { status: 200 });
    }
}
