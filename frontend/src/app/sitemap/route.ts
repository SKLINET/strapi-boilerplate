export const dynamic = 'force-dynamic';
import { NextApiRequest } from 'next';
import providers from '../../providers';
import { Provider } from '../../index';

export async function GET(req: NextApiRequest) {
    const basepath = process.env.NEXT_PUBLIC_BASE_PATH;

    return new Response(
        `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.values(
            providers,
        )
            .map((provider: Provider) => {
                if (provider?.getApiKey) {
                    if (!provider?.isSitemapEnabled()) {
                        return;
                    }
                    return `<sitemap><loc>${basepath}/sitemap/${provider.getApiKey()}.xml</loc></sitemap>`;
                } else {
                    return;
                }
            })
            .join('')}</sitemapindex>`,
        {
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
                'Cache-Control': 's-maxage=21600, stale-while-revalidate',
            },
            status: 200,
        },
    );
}
