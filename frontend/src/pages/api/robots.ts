import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const host = req.headers.host;
    res.setHeader('Content-Type', 'text/plain');
    if (process.env.NODE_ENV === 'production') {
        res.end(`User-agent: *\nDisallow: /api\nAllow: /\nAllow: /api/sitemap\nSitemap: https://${host}/sitemap.xml`);
    } else {
        res.end(`User-agent: *\nDisallow: /`);
    }
};

export default handler;
