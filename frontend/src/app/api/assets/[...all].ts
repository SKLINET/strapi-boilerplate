import dotenv from 'dotenv';
import httpProxyMiddleware from '../../../lib/proxy/httpProxyMiddleware';
import { NextApiRequest, NextApiResponse } from 'next';

dotenv.config();

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) =>
    httpProxyMiddleware(req, res, {
        target: `${process.env.API_BASE_PATH}/uploads`,
        pathRewrite: {
            '^/api/assets': '',
            '^/assets': '',
            '^/api': '',
        },
    });
