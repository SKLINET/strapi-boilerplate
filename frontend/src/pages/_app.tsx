import React, { ReactElement, useEffect } from 'react';
import { AppProps, NextWebVitalsMetric } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { trackPage } from '../utils/gtm';
import '../styles/global.scss';
import config from '../../sklinet.config.json';
import { CustomCursorProvider } from '../components/primitives/CustomCursor/CustomCursorProvider';
import metricsReport from '../utils/metricsReport/metricsReport';

if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, {
        titleColor: 'green',
        diffNameColor: 'aqua',
        trackAllPureComponents: true,
        logOnDifferentValues: false,
    });
}

export function reportWebVitals(metrics: NextWebVitalsMetric): void {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production') {
        metricsReport(metrics);
    }
}

function MyApp({ Component, pageProps }: AppProps): ReactElement {
    const router = useRouter();
    useEffect(() => {
        router.events.on('routeChangeComplete', trackPage);
        return () => {
            router.events.off('routeChangeComplete', trackPage);
        };
    }, [router.asPath, router.defaultLocale, router.events, router.locale]);

    return (
        <CustomCursorProvider>
            {config.gtm.code && (
                <Script
                    id="gtm-script"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${config.gtm.code}');
          `,
                    }}
                />
            )}
            <Component {...pageProps} />
        </CustomCursorProvider>
    );
}

export default MyApp;
