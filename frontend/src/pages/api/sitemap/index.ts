import { NextApiRequest, NextApiResponse } from 'next';
import providers from '../../../providers';
import { TLSSocket } from 'tls';
import { Provider } from '@symbio/cms';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const basepath =
        (req.socket instanceof TLSSocket || req.headers['x-forwarded-proto'] === 'https' ? 'https' : 'http') +
        '://' +
        req.headers.host;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.statusCode = 200;
    res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate');
    res.end(
        `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.values(
            providers,
        )
            .map((provider: Provider) => {
                if (provider.getApiKey() === 'webSetting') {
                    return;
                }
                return `<sitemap><loc>${basepath}/api/sitemap/${provider.getApiKey()}.xml</loc></sitemap>`;
            })
            .join('')}</sitemapindex>`,
    );
};

export default handler;
