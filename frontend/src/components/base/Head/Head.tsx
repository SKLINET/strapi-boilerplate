import React, { ReactElement } from 'react';
import NextHead from 'next/head';
import { AppContextProps } from '@symbio/headless';
import config from '../../../../sklinet.config.json';
import { WebSettingsProps } from '../../../types/webSettings';
import { PageProps } from '../../../types/page';
import { useRouter } from 'next/router';
import { getImageUrl } from '../../../utils/getImageUrl';
import { MetaItem } from '../../../types/metaItem';

export interface HeadProps {
    item?: MetaItem;
    page?: AppContextProps<PageProps, WebSettingsProps>['page'];
    site: WebSettingsProps;
}

export const Head = ({ item, page, site }: HeadProps): ReactElement => {
    const siteObj = site?.data?.attributes?.seo;
    const data = {
        title: item?.title || page?.seo?.metaTitle || page?.title || siteObj?.metaTitle || '',
        metaTitle: item?.seo?.metaTitle || page?.seo?.metaTitle || siteObj?.metaTitle || '',
        metaDescription: item?.seo?.metaDescription || page?.seo?.metaDescription || siteObj?.metaDescription || '',
        social: item?.seo?.metaSocial || page?.seo?.metaSocial || siteObj?.metaSocial || [],
        viewPort: item?.seo?.metaViewport || page?.seo?.metaViewport || siteObj?.metaViewport || '',
        keyWords: item?.seo?.keywords || page?.seo?.keywords || siteObj?.keywords || '',
        robots: item?.seo?.metaRobots || page?.seo?.metaRobots || siteObj?.metaRobots || '',
        canonical: item?.seo?.canonicalURL || page?.seo?.canonicalURL || siteObj?.canonicalURL || '',
    };
    const preventIndexing = item?.seo ? item?.seo?.preventIndexing : page?.seo ? page.seo.preventIndexing : false;
    const meta = page?.seo?.meta || siteObj?.meta;
    const router = useRouter();
    const currentPageUrl = process.env.BASE_PATH + router?.asPath;
    return (
        <NextHead>
            <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
            />

            {/* APP */}
            <link rel="manifest" href="/manifest.json" />
            <meta name="msapplication-TileColor" content="#00aba9" />
            <meta name="theme-color" content="#61279e" />
            {data?.title && <meta name="application-name" content={data.title} />}
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            {data?.title && <meta name="apple-mobile-web-app-title" content={data.title} />}
            <meta name="format-detection" content="telephone=no" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="msapplication-config" content="/browserconfig.xml" />
            <meta name="author" content="SKLINET s.r.o." />
            <meta name="owner" content="SKLINET s.r.o." />
            <meta name="copyright" content="SKLINET s.r.o." />
            <title>{data?.title}</title>
            <meta name="title" content={`${data?.metaTitle || data?.title}`} />
            <meta name="description" content={data?.metaDescription || ''} />
            {preventIndexing ? (
                <meta name="robots" content="noindex, nofollow" />
            ) : (
                <meta name="robots" content={`${data?.robots || 'index, follow'}`} />
            )}
            {meta?.map((m, key) => (
                <meta key={`meta-${key}`} property={m?.name || ''} content={m?.content || ''} />
            ))}
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

            {/* GTM */}

            <script
                dangerouslySetInnerHTML={{
                    __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${site?.data?.attributes?.gtmCode || config.gtm.code}');`,
                }}
            />
        </NextHead>
    );
};
