import React, { ReactElement } from 'react';
import NextHead from 'next/head';
import { AppContextProps } from '@symbio/headless';
import { WebSettingsProps } from '../../../types/webSettings';
import { PageProps } from '../../../types/page';
import { getImageUrl } from '../../../utils/getImageUrl';
import { useRouter } from 'next/router';
import { MetaItem } from '../../../types/metaItem';

export interface HeadProps {
    item?: MetaItem;
    page?: AppContextProps<PageProps, WebSettingsProps>['page'];
    site: WebSettingsProps;
}

type Meta = { name: string | null; content: string | null } | null;

export const Head = ({ page, site, item }: HeadProps): ReactElement => {
    const siteObj = site?.data?.attributes?.globalSeo;
    const data = {
        title: item?.seo?.title || item?.title || page?.attributes?.seo?.title || page?.attributes?.title || '',
        metaTitle: item?.seo?.metaTitle || page?.attributes?.seo?.metaTitle || page?.attributes?.title || '',
        metaDescription:
            item?.seo?.metaDescription || page?.attributes?.seo?.metaDescription || siteObj?.description || '',
        social: item?.seo?.metaSocial || page?.attributes?.seo?.metaSocial || [],
        viewPort: item?.seo?.metaViewport || page?.attributes?.seo?.metaViewport || '',
        keyWords: item?.seo?.keywords || page?.attributes?.seo?.keywords || '',
        robots: item?.seo?.metaRobots || page?.attributes?.seo?.metaRobots || '',
        canonical: item?.seo?.canonicalURL || page?.attributes?.seo?.canonicalURL || '',
    };
    const preventIndexing = siteObj?.preventIndexing || page?.attributes?.seo?.preventIndexing || false;
    const meta = page?.attributes?.seo?.meta || siteObj?.metaTags || [];

    const router = useRouter();
    const currentPageUrl = process.env.BASE_PATH + router?.asPath;

    const faviconUrl = siteObj?.favicon?.data?.attributes?.url
        ? getImageUrl(siteObj?.favicon?.data?.attributes?.url)
        : '';
    return (
        <NextHead>
            {/* Meta */}
            <title>{`${data?.title}${siteObj?.titleSuffix || ''}`}</title>
            <meta name="title" content={`${data?.metaTitle || data?.title}${siteObj?.titleSuffix || ''}`} />
            <meta name="description" content={data?.metaDescription || ''} />
            <meta name="keywords" content={data?.keyWords || ''} />
            {preventIndexing ? (
                <meta name="robots" content="noindex, nofollow" />
            ) : (
                <meta name="robots" content={`${data?.robots || 'index, follow'}`} />
            )}
            {meta?.map((m: Meta, key: number) => {
                if (!m || !m.name || !m.content) return null;
                return <meta key={`meta-${key}`} property={m?.name} content={m?.content} />;
            })}
            {data?.social?.length > 0 &&
                data?.social?.map((item, i: number) => (
                    <React.Fragment key={`meta-social-tag-${i}`}>
                        <meta
                            property={item?.socialNetwork === 'Facebook' ? 'og:title' : 'twitter:title'}
                            content={item?.title || ''}
                        />
                        <meta
                            property={item?.socialNetwork === 'Facebook' ? 'og:description' : 'twitter:description'}
                            content={item?.description || ''}
                        />
                        <meta
                            property={item?.socialNetwork === 'Facebook' ? 'og:image' : 'twitter:image'}
                            content={getImageUrl(item?.image?.data?.attributes?.url) || ''}
                        />

                        <meta
                            property={item?.socialNetwork === 'Facebook' ? 'og:url' : 'twitter:url'}
                            content={currentPageUrl || ''}
                        />

                        <meta
                            property={item?.socialNetwork === 'Facebook' ? 'og:type' : 'twitter:card'}
                            content={item?.socialNetwork === 'Facebook' ? 'website' : 'summary_large_image'}
                        />
                    </React.Fragment>
                ))}
            {data?.canonical && <link rel="canonical" href={data?.canonical || ''} />}
            <meta name="msapplication-TileColor" content="#FFFFFF" />
            <meta name="theme-color" content="#FFFFFF" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover" />
            {siteObj?.sharingImage?.data?.attributes?.url && (
                <meta property="og:image" content={siteObj.sharingImage.data.attributes.url} />
            )}

            {/* Favicon */}
            {faviconUrl ? (
                <>
                    <link rel="shortcut icon" href={faviconUrl} />
                    <link rel="apple-touch-icon" sizes="180x180" href={faviconUrl} />
                    <link rel="icon" type="image/png" sizes="32x32" href={faviconUrl} />
                    <link rel="icon" type="image/png" sizes="16x16" href={faviconUrl} />
                </>
            ) : (
                <>
                    <link rel="shortcut icon" href="/favicon/favicon.ico" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
                </>
            )}

            {/* APP */}
            {/* <link rel="manifest" href="/manifest.json" /> */}
            {siteObj?.siteName && <meta name="application-name" content={siteObj.siteName} />}
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            {siteObj?.siteName && <meta name="apple-mobile-web-app-title" content={siteObj.siteName} />}
            <meta name="format-detection" content="telephone=no" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="msapplication-config" content="/browserconfig.xml" />
        </NextHead>
    );
};
