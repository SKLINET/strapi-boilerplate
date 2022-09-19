import { NextApiRequest, NextApiResponse } from 'next';
import busboy from 'busboy';
import { fetchQuery } from 'relay-runtime';
import dotenv from 'dotenv';
import { sendTemplatedEmailQuery } from '../../../relay/api/__generated__/sendTemplatedEmailQuery.graphql';
import { SendTemplatedEmailQuery } from '../../../relay/api/sendTemplatedEmail';
import { createRelayEnvironment } from '../../../relay/createRelayEnvironment';

dotenv.config();

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse): void => {
    if (req.method == 'POST') {
        const bb = busboy({ headers: req.headers });
        const data: Record<string, string> = {};

        bb.on('field', function (fieldname, val) {
            data[fieldname] = val;
        });

        bb.on('close', async function () {
            const environment = createRelayEnvironment({});
            try {
                await fetchQuery<sendTemplatedEmailQuery>(environment, SendTemplatedEmailQuery, {
                    emailTo: data?.email,
                    emailTemplate: Number(data?.templateId),
                    email: data?.email,
                    firstName: data?.firstName,
                }).toPromise();
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
