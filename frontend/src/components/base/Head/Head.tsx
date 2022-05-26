import React, { ReactElement } from 'react';
import NextHead from 'next/head';
import { AppContextProps } from '@symbio/headless';
import config from '../../../../sklinet.config.json';
import { WebSettingsProps } from '../../../types/webSettings';

// ** TODO ** fix any, Strapi GQL structure doesn't match our needs
export interface HeadProps {
    item?: AppContextProps<any, WebSettingsProps>['item'];
    page?: AppContextProps<any, WebSettingsProps>['page'];
    site: WebSettingsProps;
}

export const Head = ({ item, page, site }: HeadProps): ReactElement => {
    // const metaTags: SeoMetaTagType[] = (item?.data?.attributes?.meta?.meta || page?._seoMetaTags || []).concat(
    //     site?.data?.attributes?.globalSeo?.faviconMetaTags || [],
    // ) as SeoMetaTagType[];

    return (
        <NextHead>
            {/*{renderMetaTags(metaTags)}*/}

            <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
            />

            {/* APP */}
            {/* <link rel="manifest" href="/manifest.json" /> */}
            <meta name="msapplication-TileColor" content="#00aba9" />
            <meta name="theme-color" content="#61279e" />
            {site?.data?.attributes?.globalSeo?.siteName && (
                <meta name="application-name" content={site?.data?.attributes?.globalSeo?.siteName} />
            )}
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            {site?.data?.attributes?.globalSeo?.siteName && (
                <meta name="apple-mobile-web-app-title" content={site?.data?.attributes?.globalSeo?.siteName} />
            )}
            <meta name="format-detection" content="telephone=no" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="msapplication-config" content="/browserconfig.xml" />

            {/* GTM */}
            {config.gtm.code && (
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${config.gtm.code}');`,
                    }}
                />
            )}
        </NextHead>
    );
};
