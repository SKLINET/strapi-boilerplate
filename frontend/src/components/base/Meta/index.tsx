import React, { ReactElement } from 'react';
import Head from 'next/head';
import { Page } from '../../../types/page';
import { Article } from '../../../types/article';
import { getImageUrl } from '../../../utils/getImageUrl';

interface MetaProps {
    page: Page;
    object?: Article | null;
    gtm: string;
}

type Meta = { name: string; content: string };

export function PageMeta({ object, page, gtm }: MetaProps): ReactElement {
    const data = {
        title: object?.meta?.title || object?.title || page?.meta?.title || page?.title || '',
        metaTitle: object?.meta?.metaTitle || page?.meta?.metaTitle,
        metaDescription: object?.meta?.metaDescription || page?.meta?.metaDescription,
        ogImage: object?.meta?.image || page?.meta?.image || null,
    };
    const preventIndexing = object?.meta?.preventIndexing || page?.meta?.preventIndexing || false;
    const meta = object?.meta?.meta || page?.meta?.meta || [];

    return (
        <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover" />
            <meta name="author" content="SKLINET s.r.o." />
            <meta name="owner" content="SKLINET, s.r.o." />
            <meta name="copyright" content="SKLINET, s.r.o." />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Roboto:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <meta name="format-detection" content="telephone=no" />

            {gtm && (
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtm}');`,
                    }}
                />
            )}
            <title>{data?.title}</title>
            <meta name="title" content={`${data?.metaTitle || data?.title}`} />
            <meta name="description" content={data?.metaDescription || ''} />
            {preventIndexing ? (
                <meta name="robots" content="noindex, nofollow" />
            ) : (
                <meta name="robots" content="index, follow" />
            )}
            {meta?.map((m: Meta, key: number) => (
                <meta key={`meta-${key}`} property={m?.name} content={m?.content} />
            ))}
            {data?.ogImage && <meta property="og:image" content={getImageUrl(data?.ogImage?.media?.url)} />}
            <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png" />
            <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-icon-192x192.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
            <link rel="manifest" href="/favicon/manifest.json" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png" />
            <meta name="theme-color" content="#ffffff" />
        </Head>
    );
}
