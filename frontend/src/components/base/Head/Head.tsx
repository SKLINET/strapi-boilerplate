import React, { ReactElement } from 'react';
import NextHead from 'next/head';
import { AppContextProps } from '@symbio/headless';
import config from '../../../../sklinet.config.json';
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
    const siteObj = site?.data?.attributes?.seo;
    const data = {
        title:
            item?.seo?.title ||
            item?.title ||
            page?.attributes?.seo?.title ||
            page?.attributes?.title ||
            siteObj?.title ||
            '',
        metaTitle: item?.seo?.metaTitle || page?.attributes?.seo?.metaTitle || siteObj?.metaTitle || '',
        metaDescription:
            item?.seo?.metaDescription || page?.attributes?.seo?.metaDescription || siteObj?.metaDescription || '',
        social: item?.seo?.metaSocial || page?.attributes?.seo?.metaSocial || siteObj?.metaSocial || [],
        viewPort: item?.seo?.metaViewport || page?.attributes?.seo?.metaViewport || siteObj?.metaViewport || '',
        keyWords: item?.seo?.keywords || page?.attributes?.seo?.keywords || siteObj?.keywords || '',
        robots: item?.seo?.metaRobots || page?.attributes?.seo?.metaRobots || siteObj?.metaRobots || '',
        canonical: item?.seo?.canonicalURL || page?.attributes?.seo?.canonicalURL || siteObj?.canonicalURL || '',
    };
    const preventIndexing = page?.attributes?.seo ? page?.attributes?.seo?.preventIndexing : false;
    const meta = page?.attributes?.seo?.meta || [];

    const router = useRouter();
    const currentPageUrl = process.env.BASE_PATH + router?.asPath;

    return (
        <NextHead>
            {/* Meta */}
            <title>{data?.title}</title>
            <meta name="title" content={`${data?.metaTitle || data?.title}`} />
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

            {/* Favicon */}
            {/* <link rel="shortcut icon" href="/favicon/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" /> */}

            {/* APP */}
            {/* <link rel="manifest" href="/manifest.json" /> */}
            {siteObj?.title && <meta name="application-name" content={siteObj.title} />}
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            {siteObj?.title && <meta name="apple-mobile-web-app-title" content={siteObj?.title} />}
            <meta name="format-detection" content="telephone=no" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="msapplication-config" content="/browserconfig.xml" />

            {/* GTM */}
            {config.gtm.code && (
                // eslint-disable-next-line @next/next/next-script-for-ga
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${site?.data?.attributes?.gtmCode || config.gtm.code}');`,
                    }}
                />
            )}
        </NextHead>
    );
};
