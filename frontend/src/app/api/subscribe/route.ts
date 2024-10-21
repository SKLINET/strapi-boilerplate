import { NextApiRequest, NextApiResponse } from 'next';
import busboy from 'busboy';

import { commitMutation, fetchQuery } from 'relay-runtime';
import dotenv from 'dotenv';
import { subscribeMutation } from '../../../relay/api/__generated__/subscribeMutation.graphql';
import { SubscribeFormMutation } from '../../../relay/api/subscribe';

import getPublicationState from '../../../utils/base/getPublicationState';
import { createRelayEnvironment } from '../../../relay/createRelayEnvironment';
dotenv.config();

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const bb = busboy({ headers: req.headers });
        const data: Record<string, string> = {};
        bb.on('field', function (fieldname, val) {
            data[fieldname] = val;
        });

        bb.on('close', async function () {
            const environment = createRelayEnvironment({});
            try {
                await commitMutation<subscribeMutation>(environment, {
                    mutation: SubscribeFormMutation,
                    variables: {
                        data: {
                            email: data?.email || '',
                        },
                    },
                });
            } catch (e) {
                console.log('ERR WHILE SAVING CONTACT IN DATABASE');
            }

            // try {
            //     const { newsletterBox } = (await fetchQuery<subscribeEcomailQuery>(environment, EcomailSettingsQuery, {
            //         status: getPublicationState(),
            //         locale: data?.locale || 'cs',
            //     }).toPromise()) as subscribeEcomailQuery['response'];
            //     const ecomailData = newsletterBox?.data?.attributes?.ecomail;
            //     const listId =
            //         data?.isOrder === 'true' && ecomailData?.orderListId
            //             ? ecomailData?.orderListId
            //             : ecomailData?.listId;

            //     ecomail.setConfig(ecomailData?.apiKey || '');
            //     const resp = await ecomail.addSubscriberToList(listId || '', {
            //         subscriber_data: {
            //             email: data?.email || '',
            //         },
            //     });
            //     console.log('Ecomail response:', resp);
            // } catch (e) {
            //     console.log('ERR WHILE SAVING CONTACT IN ECOMAIL');
            // }

            return res.send({
                success: true,
            });
        });

        req.pipe(bb);
        bb.write(req.body);
    } else {
        res.statusCode = 405;
        res.end('Method not allowed');
    }
}

export default handler;
