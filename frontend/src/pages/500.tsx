import React, { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import timeZone from 'dayjs/plugin/timezone';
import updateLocale from 'dayjs/plugin/updateLocale';
import { GetStaticProps } from 'next';
import config from '../../sklinet.config.json';
import blocks from '../blocks/server';
import { Blocks } from '../components/base/Blocks/Blocks';
import { Head } from '../components/base/Head/Head';
import { Layout } from '../components/base/Layout/Layout';
import { CALENDAR_FORMATS } from '../constants';
import providers from '../providers';
import { AppStore, getBlocksProps } from '@symbio/headless';
import { PageProps } from '../types/page';
import { WebSettingsProps } from '../types/webSettings';
import { PreviewToolbar } from '../components/primitives/PreviewToolbar/PreviewToolbar';
import { IApp } from '../types/app';
import { IPageProps } from '../types/page';

const GridHelper = dynamic(() =>
    import('../components/primitives/GridHelper/GridHelper').then((mod) => mod.GridHelper),
);

const Page = (props: IPageProps): ReactElement => {
    const { hostname, site, page, webSetting, blocksPropsMap, redirect, preview, systemResources } = props;
    const { gtm, tz } = config;
    const router = useRouter();
    const locale = router.locale || router.defaultLocale;
    const currentUrl =
        '/' + (router.locale === router.defaultLocale ? '' : router.locale) + router.asPath !== '/'
            ? router.asPath
            : '';

    const app: IApp = {
        currentUrl,
        hostname,
        page,
        site,
        webSetting,
        redirect,
        systemResources,
    };
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    dayjs.extend(updateLocale);
    dayjs.extend(timeZone);
    if (locale) {
        dayjs.updateLocale(locale, { calendar: CALENDAR_FORMATS[locale] });
        dayjs.locale(locale);
    }
    dayjs.tz.setDefault(tz);

    AppStore.getInstance<PageProps, WebSettingsProps>(app);

    const gtmCode = webSetting?.data?.attributes?.gtmCode || config.gtm.code;

    return (
        <>
            <Head site={webSetting} page={page} />
            <Layout app={app}>
                {page?.attributes?.content && (
                    <Blocks blocksData={page?.attributes?.content || []} initialProps={blocksPropsMap} app={app} />
                )}
            </Layout>

            {preview && page && <PreviewToolbar page={page} locale={locale || ''} />}
            {process.env.NODE_ENV === 'development' && <GridHelper />}

            {gtmCode && (
                <noscript
                    dangerouslySetInnerHTML={{
                        __html: `<!-- Google Tag Manager (noscript) -->
                        <iframe src="https://www.googletagmanager.com/ns.html?id=${gtmCode}" height="0" width="0" style="display:none;visibility:hidden"></iframe>
                        <!-- End Google Tag Manager (noscript) -->`,
                    }}
                />
            )}
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    const locale = context.locale || context.defaultLocale;
    const { tz } = config;
    dayjs.extend(updateLocale);
    dayjs.extend(timeZone);
    if (locale) {
        dayjs.updateLocale(locale, { calendar: CALENDAR_FORMATS[locale] });
        dayjs.locale(locale);
    }
    dayjs.tz.setDefault(tz);

    const renamedBlocks: Record<string, any> = {};
    for (const key in blocks) {
        renamedBlocks[`ComponentBlock${key}`] = blocks[key];
    }

    try {
        return await getBlocksProps(
            { ...context, params: { ...context.params, slug: ['500'] } },
            providers,
            renamedBlocks,
            config.ssg,
        );
    } catch (e) {
        return {
            props: {},
            notFound: true,
        };
    }
};

export default Page;
