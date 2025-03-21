import { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { ServerContextProps, ParamsProps } from '../../types/base/page';
import { getLocale } from '../../utils/base/getLocal';
import { getStaticProps } from '../../utils/base/getStaticProps';
import { getItemFromPageResponse } from '../../utils/base/getItemFromPageResponse';
import { getMetaFromItem } from '../../utils/base/getMetaFromItem';
import { getImageUrl } from '../../utils/getImageUrl';
import { getSocialNetworksType } from '../../utils/strapi/getSocialNetworksType';
import { redirect, permanentRedirect } from 'next/navigation';
import { Poppins } from 'next/font/google';
import { TopLoader } from '../components/base/TopLoader/TopLoader';

import '../../styles/global.scss';

const primary = Poppins({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--font-primary',
    display: 'swap',
});

export function generateViewport({ params, searchParams }: ServerContextProps): Viewport {
    return {
        themeColor: 'white',
        width: 'device-width',
        initialScale: 1,
    };
}

export async function generateMetadata({ params, searchParams }: ServerContextProps): Promise<Metadata> {
    const context = {
        params: await params,
        searchParams: await searchParams,
    };
    const data = await getStaticProps(context);

    if (data?.redirect?.to) {
        if ((data?.redirect as any)?.permanent) {
            permanentRedirect(data.redirect.to);
        } else {
            redirect(data.redirect.to);
        }
    }

    const item = getItemFromPageResponse(data);

    const { webSetting, page } = data;

    const globalSeo = webSetting?.globalSeo;

    const itemMeta = getMetaFromItem(item);

    const locale = getLocale(context.params.slug);

    const itemSharingImage = itemMeta?.image?.url ? getImageUrl(itemMeta.image.url, true) : null;
    const globalSharingImage = globalSeo?.sharingImage?.url ? getImageUrl(globalSeo.sharingImage.url, true) : null;

    const metaData = {
        siteName: globalSeo?.siteName,
        title: itemMeta?.seo?.title || itemMeta?.title || page?.seo?.title || page?.title || '',
        suffix: globalSeo?.titleSuffix || '',
        metaTitle: itemMeta?.seo?.metaTitle || itemMeta?.title || page?.seo?.metaTitle || page?.title || '',
        metaDescription:
            itemMeta?.seo?.metaDescription ||
            itemMeta?.description ||
            page?.seo?.metaDescription ||
            globalSeo?.description ||
            '',
        keyWords: itemMeta?.seo?.keywords || page?.seo?.keywords || '',
        robots: itemMeta?.seo?.metaRobots || page?.seo?.metaRobots || null,
        meta: itemMeta?.seo?.meta || page?.seo?.meta || globalSeo?.metaTags || [],
        social: itemMeta?.seo?.socialNetworks || page?.seo?.socialNetworks || null,
        canonical: itemMeta?.seo?.canonicalURL || page?.seo?.canonicalURL || null,
        viewPort: itemMeta?.seo?.metaViewport || page?.seo?.metaViewport || null,
        preventIndexing:
            itemMeta?.seo?.preventIndexing || globalSeo?.preventIndexing || page?.seo?.preventIndexing || false,
        sharingImage: itemSharingImage || globalSharingImage || null,
        structuredData: itemMeta?.seo?.structuredData || page?.seo?.structuredData || null,
    };

    const share = getSocialNetworksType(metaData.social);

    const title = `${metaData.title.toString()}${metaData.suffix.toString()}`;
    const metaTitle = `${metaData.metaTitle.toString()}${metaData.suffix.toString()}`;

    const customMetaData: Record<string, string> = {
        title: metaData.metaTitle,
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
        'format-detection': 'telephone=no',
        'mobile-web-app-capable': 'yes',
    };

    if (metaData.siteName) {
        customMetaData['application-name'] = metaData.siteName;
        customMetaData['apple-mobile-web-app-title'] = metaData.siteName;
    }

    {
        metaData.meta.forEach((item) => {
            if (item && item.name && item.content) {
                customMetaData[item.name] = item.content;
            }
        });
    }

    return {
        title: title,
        description: metaData.metaDescription,
        keywords: metaData.keyWords,
        robots: metaData.preventIndexing
            ? {
                  index: false,
                  follow: false,
                  nocache: false,
              }
            : {
                  index: true,
                  follow: true,
                  nocache: true,
              },
        metadataBase: new URL(String(process.env.NEXT_PUBLIC_BASE_PATH)),
        generator: metaData.siteName,
        applicationName: metaData.siteName,
        openGraph: {
            title: share?.facebook?.title || metaTitle,
            description: share?.facebook?.description || metaData.metaDescription,
            siteName: metaData.siteName || '',
            images: [
                {
                    url: share?.facebook?.image.url || metaData.sharingImage || '',
                },
            ],
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: share?.twitter?.title || metaTitle,
            description: share?.twitter?.description || metaData.metaDescription,
            images: [
                {
                    url: share?.twitter?.image.url || metaData.sharingImage || '',
                },
            ],
        },
        appleWebApp: {
            title: metaData.siteName || '',
            statusBarStyle: 'default',
        },
        other: customMetaData,
    };
}

interface RootLayoutProps {
    children: ReactNode;
    params: Promise<ParamsProps>;
}

const RootLayout = async ({ children, params }: RootLayoutProps) => {
    const { slug } = await params;

    return (
        <html lang={getLocale(slug)} className={`${primary.variable}`}>
            <head>
                <link rel="preconnect" href="https://res.cloudinary.com" />
                <link rel="dns-prefetch" href="https://res.cloudinary.com" />

                {/* Favicon */}
                <link rel="icon" href={'/favicon/favicon.ico'} type="image/x-icon" />
                {/* <link rel="apple-touch-icon" href={'/favicon/appleTouchIcon.png'} /> */}
                {/* <link rel="icon" href={'/favicon/androidChromeIcon.png'} type="image/png" /> */}

                {/* Cookiebot */}
                {/*
                <script
                    id="Cookiebot"
                    src={`https://consent.cookiebot.com/uc.js`}
                    data-culture={getLocale(slug)}
                    data-cbid="YOUR_COOKIEBOT_ID"
                    type="text/javascript"
                    data-blockingmode="auto"
                    defer
                />
                */}
            </head>
            <body>
                <TopLoader />
                {children}
            </body>
        </html>
    );
};

export default RootLayout;
