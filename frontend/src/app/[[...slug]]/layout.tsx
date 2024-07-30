import { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { ContextProps, ParamsProps } from '../../types/base/page';
import { getLocale } from '../../utils/base/getLocal';
import { getStaticProps } from '../../utils/base/getStaticProps';
import { getItemFromPageResponse } from '../../utils/base/getItemFromPageResponse';
import { getMetaFromItem } from '../../utils/base/getMetaFromItem';
import { getImageUrl } from '../../utils/getImageUrl';
import { getSocialNetworksType } from '../../utils/strapi/getSocialNetworksType';
import { redirect, permanentRedirect } from 'next/navigation';
import localFont from 'next/font/local';
import { TopLoader } from '../components/base/TopLoader/TopLoader';

import '../../styles/global.scss';

const primary = localFont({
    src: [
        // 400
        {
            path: '../../../public/fonts/Poppins/truetype/Poppins-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/Poppins/truetype/Poppins-Italic.ttf',
            weight: '400',
            style: 'italic',
        },
        // 700
        {
            path: '../../../public/fonts/Poppins/truetype/Poppins-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/Poppins/truetype/Poppins-BoldItalic.ttf',
            weight: '700',
            style: 'italic',
        },
    ],
    variable: '--font-primary',
    display: 'fallback',
});

export function generateViewport(context: ContextProps): Viewport {
    return {
        themeColor: 'white',
        width: 'device-width',
        initialScale: 1,
    };
}

export async function generateMetadata(context: ContextProps): Promise<Metadata> {
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

    const globalSeo = webSetting?.data?.attributes?.globalSeo;

    const itemMeta = getMetaFromItem(item);

    const locale = getLocale(context.params.slug);

    const itemSharingImage = itemMeta?.image?.url ? getImageUrl(itemMeta.image.url, true) : null;
    const globalSharingImage = globalSeo?.sharingImage?.data?.attributes?.url
        ? getImageUrl(globalSeo.sharingImage.data.attributes.url, true)
        : null;

    const metaData = {
        siteName: globalSeo?.siteName,
        title: itemMeta?.seo?.title || itemMeta?.title || page?.attributes?.seo?.title || page?.attributes?.title || '',
        suffix: globalSeo?.titleSuffix || '',
        metaTitle:
            itemMeta?.seo?.metaTitle ||
            itemMeta?.title ||
            page?.attributes?.seo?.metaTitle ||
            page?.attributes?.title ||
            '',
        metaDescription:
            itemMeta?.seo?.metaDescription ||
            itemMeta?.description ||
            page?.attributes?.seo?.metaDescription ||
            globalSeo?.description ||
            '',
        keyWords: itemMeta?.seo?.keywords || page?.attributes?.seo?.keywords || '',
        robots: itemMeta?.seo?.metaRobots || page?.attributes?.seo?.metaRobots || null,
        meta: itemMeta?.seo?.meta || page?.attributes?.seo?.meta || globalSeo?.metaTags || [],
        social: itemMeta?.seo?.socialNetworks || page?.attributes?.seo?.socialNetworks || null,
        canonical: itemMeta?.seo?.canonicalURL || page?.attributes?.seo?.canonicalURL || null,
        viewPort: itemMeta?.seo?.metaViewport || page?.attributes?.seo?.metaViewport || null,
        preventIndexing:
            itemMeta?.seo?.preventIndexing ||
            globalSeo?.preventIndexing ||
            page?.attributes?.seo?.preventIndexing ||
            false,
        sharingImage: itemSharingImage || globalSharingImage || null,
        structuredData: itemMeta?.seo?.structuredData || page?.attributes?.seo?.structuredData || null,
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
            card: 'app',
            app: { id: {} },
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
    params: ParamsProps;
}

const RootLayout = async ({ children, params }: RootLayoutProps) => (
    <html lang={getLocale(params.slug)} className={`${primary.variable}`}>
        <head>
            <link rel="preconnect" href="https://res.cloudinary.com" />
            <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        </head>
        <body>
            <TopLoader />
            {children}
        </body>
    </html>
);

export default RootLayout;
