import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    res.clearPreviewData();
    res.redirect(req.headers.referer || '/');
};
