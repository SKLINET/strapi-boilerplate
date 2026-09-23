import { ReactNode, Suspense } from 'react';
import type { Metadata, Viewport } from 'next';
import { ServerContextProps, ParamsProps } from '../../types/base/page';
import { getLocale } from '../../utils/base/getLocal';
import { cachedMetadata } from '../../utils/cache/cachedMetadata';
import { isSystemPageSlug } from '../../utils/cache/page';
import { getItemFromPageResponse } from '../../utils/base/getItemFromPageResponse';
import { getMetaFromItem } from '../../utils/base/getMetaFromItem';
import { getImageUrl } from '../../utils/getImageUrl';
import { getSocialNetworksType } from '../../utils/strapi/getSocialNetworksType';
import { redirect, permanentRedirect } from 'next/navigation';
import { Poppins } from 'next/font/google';
import { TopLoader } from '../components/base/TopLoader/TopLoader';
import config from '../../../sklinet.config.json';
import { Providers } from './providers';

import '../../styles/global.css';

const primary = Poppins({
    weight: ['400', '700'],
    style: ['normal'],
    subsets: ['latin'],
    variable: '--font-primary',
    display: 'swap',
});

export function generateViewport({ params }: ServerContextProps): Viewport {
    return {
        themeColor: 'white',
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
    };
}

/**
 * @description Build the page metadata.
 *
 * Deliberately NOT a `'use cache'` function: a scope here belongs to the catch-all layout, so the
 * tags written inside `cachedMetadata` would union onto every URL and one publish would expire the
 * whole site. `cachedMetadata` is the only metadata cache boundary; redirects stay outside it.
 * @param {ServerContextProps} context - Route params and search params
 * @returns {Promise<Metadata>} Next.js metadata for the URL
 **/
export async function generateMetadata({ params }: ServerContextProps): Promise<Metadata> {
    const resolvedParams = await params;
    const slug = resolvedParams.slug || [];

    const isSystemPage = isSystemPageSlug(slug);

    const pathname =
        '/' +
        slug
            .filter((e, i) => {
                if (i === 0 && e === config.i18n.defaultLocale) return false;
                return true;
            })
            .join('/');

    const data = await cachedMetadata(slug, getLocale(slug));

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

    const locale = getLocale(slug);

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
        canonical: itemMeta?.seo?.canonicalURL || page?.seo?.canonicalURL || pathname,
        viewPort: itemMeta?.seo?.metaViewport || page?.seo?.metaViewport || null,
        // A not-found response is never indexable, whatever the CMS says. The URL still answers 200
        // — under a catch-all, `notFound()` comes too late to change the status once the response
        // has started streaming — so `noindex` is what keeps a broken URL out of search results.
        preventIndexing:
            data.isNotFound ||
            isSystemPage ||
            itemMeta?.seo?.preventIndexing ||
            globalSeo?.preventIndexing ||
            page?.seo?.preventIndexing ||
            false,
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
        metadataBase: String(process.env.NEXT_PUBLIC_BASE_PATH),
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
        alternates: {
            canonical: metaData.canonical,
        },
        other: customMetaData,
    };
}

interface RootLayoutProps {
    children: ReactNode;
    params: Promise<ParamsProps>;
}

/**
 * Deliberately NOT a `'use cache'` component: a cache scope covers everything a component renders,
 * including what sits behind a <Suspense> boundary, so anything dynamic below would be frozen into
 * it. `TopLoader` reads `useSearchParams()` and stays behind its own <Suspense> so the layout still
 * produces a complete static shell for Partial Prerender.
 */
const RootLayout = async ({ children, params }: RootLayoutProps) => {
    const { slug } = await params;

    return (
        <html lang={getLocale(slug)} className={`${primary.variable}`} data-scroll-behavior="smooth">
            <head>
                {/* Favicon — root URLs, served from public/favicon via the rewrite in next.config */}
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />

                {/* Render Cookiebot only if the user has not opted out */}
                {/*
                <Suspense fallback={null}>
                    <WithoutScripts>
                        <script
                            id="Cookiebot"
                            src={`https://consent.cookiebot.com/uc.js`}
                            data-culture={getLocale(slug)}
                            data-cbid="YOUR_COOKIEBOT_ID"
                            type="text/javascript"
                            data-blockingmode="auto"
                            defer
                        />
                    </WithoutScripts>
                </Suspense>
                */}
            </head>
            <body>
                <Suspense fallback={null}>
                    <TopLoader />
                </Suspense>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
};

export default RootLayout;
