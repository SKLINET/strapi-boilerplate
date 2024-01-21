import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = String(process.env.NEXT_PUBLIC_BASE_PATH);
    if (process.env.NODE_ENV === 'production' && !baseUrl.includes('beneficiotest.cz')) {
        return {
            rules: {
                userAgent: '*',
                allow: ['/', '/api/sitemap'],
                disallow: '/api/',
            },
            sitemap: `${baseUrl}/sitemap.xml`,
        };
    } else {
        return {
            rules: {
                userAgent: '*',
                disallow: '/',
            },
        };
    }
}
