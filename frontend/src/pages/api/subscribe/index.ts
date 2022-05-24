import { NextApiRequest, NextApiResponse } from 'next';
import Busboy, { BusboyHeaders } from 'busboy';
import { commitMutation, fetchQuery } from 'relay-runtime';
import dotenv from 'dotenv';
import { subscribeMutation } from '../../../relay/api/__generated__/subscribeMutation.graphql';
import { SubscribeFormMutation } from '../../../relay/api/subscribe';
// import ecomail from '../../../lib/ecomail/client';
//
// import {
//     subscribeEcomailQuery,
//     subscribeEcomailQueryResponse,
// } from '../../../relay/api/__generated__/subscribeEcomailQuery.graphql';
// import getPublicationState from '../../../utils/getPublicationState';
import { createRelayEnvironment } from '../../../utils/createRelayEnvironment';

dotenv.config();

export default (req: NextApiRequest, res: NextApiResponse): void => {
    if (req.method == 'POST') {
        const busboy = new Busboy({ headers: req.headers as BusboyHeaders });
        const data: Record<string, string> = {};

        busboy.on('field', function (fieldname, val) {
            data[fieldname] = val;
        });

        busboy.on('finish', async function () {
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

            try {
                // const { newsletterBox } = (await fetchQuery<subscribeEcomailQuery>(environment, EcomailSettingsQuery, {
                //     publicationState: getPublicationState(),
                // }).toPromise()) as subscribeEcomailQueryResponse;
                //
                // const ecomailData = newsletterBox?.ecomail;
                //
                // ecomail.setConfig(ecomailData?.apiKey || '');
                // const resp = await ecomail.addSubscriberToList(ecomailData?.listId || '', {
                //     subscriber_data: {
                //         email: data?.email || '',
                //     },
                // });
                // console.log(resp);
            } catch (e) {
                console.log('ERR WHILE SAVING CONTACT IN ECOMAIL');
            }

            return res.send({
                success: true,
            });
        });

        busboy.write(req.body);
    }
};
