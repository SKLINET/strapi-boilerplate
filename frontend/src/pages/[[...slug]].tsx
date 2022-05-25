import React, { ReactElement, useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import config from '../../sklinet.config.json';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import timeZone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { Layout } from '../components/base/Layout/Layout';
import { Logger } from '@symbio/headless/services';
import { MyPageProps } from '../types/page';
import { AppContext } from '../utils/AppContext';
import { Page as PageProps } from '../types/page';
import { Blocks } from '../components/base/Blocks/Blocks';
import { trackPage } from '../utils/gtm';
import { PageMeta } from '../components/base/Meta';
import blocks from '../blocks';
import { getBlocksProps } from '../lib/blocks/getBlocksProps';
import { Article } from '../types/article';
import { SWRConfig } from 'swr';
import { RelayEnvironmentProvider } from 'relay-hooks';
import { createRelayEnvironment } from '../utils/createRelayEnvironment';
import NextNprogress from 'nextjs-progressbar';
import dynamic from 'next/dynamic';

const resolvePage = (page: PageProps | undefined, blocksProps: any) => {
    if (!page) {
        return <></>;
    }
    return <Blocks blocksData={page?.blocks} initialProps={blocksProps} />;
};

const GridHelper = dynamic<unknown>(() =>
    import('../components/primitives/GridHelper/GridHelper').then((mod) => mod.GridHelper),
);

const Page = (props: MyPageProps): ReactElement => {
    const { page, webSetting, systemResources, blocksProps } = props;
    const settings: Record<string, any> = webSetting?.data?.attributes || {};
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const router = useRouter();
    const locale = router.locale || router.defaultLocale;
    const currentUrl =
        '/' + (router.locale === router.defaultLocale ? '' : router.locale) + router.asPath !== '/'
            ? router.asPath
            : '';

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    let object: Article | null = null;
    for (const p of blocksProps) {
        if (p.item) {
            object = p.item;
            break;
        }
    }

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    dayjs.extend(updateLocale);
    dayjs.extend(timeZone);
    dayjs.extend(localizedFormat);
    if (locale) {
        dayjs.locale(locale);
    }
    dayjs.tz.setDefault(config.tz);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        trackPage(currentUrl);
    }, [currentUrl]);

    return (
        <AppContext.Provider
            value={{
                uri: currentUrl,
                locale: locale,
                defaultLocale: router.defaultLocale,
                page: page,
                nextRouteName: page?.routeName,
                systemResources: systemResources?.data?.map((d: any) => d?.attributes) || [],
                showSpinner,
                setShowSpinner,
                ...webSetting,
            }}
        >
            <RelayEnvironmentProvider environment={createRelayEnvironment({})}>
                <SWRConfig
                    value={{
                        refreshInterval: 0,
                        fetcher: (url: string) =>
                            fetch(url, {
                                headers: new Headers(),
                                credentials: 'same-origin',
                                mode: 'same-origin',
                            }).then((res) => res.json()),
                        revalidateOnMount: true,
                    }}
                >
                    {page && <PageMeta object={object} page={page} gtm={settings?.gtmCode || ''} />}
                    <script>0</script>
                    {settings?.gtmCode && (
                        <noscript
                            dangerouslySetInnerHTML={{
                                __html: `<!-- Google Tag Manager (noscript) -->
                    <iframe src="https://www.googletagmanager.com/ns.html?id=${settings?.gtmCode}" height="0" width="0" style="display:none;visibility:hidden"></iframe>
                    <!-- End Google Tag Manager (noscript) -->`,
                            }}
                        />
                    )}
                    <NextNprogress color={'#00CCCB'} options={{ showSpinner: false }} />
                    <Layout>{resolvePage(page, blocksProps)}</Layout>
                    {process.env.NODE_ENV === 'development' && <GridHelper />}
                </SWRConfig>
            </RelayEnvironmentProvider>
        </AppContext.Provider>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const p = context.params;
    Logger.info('GET ' + '/' + (p && Array.isArray(p.slug) ? p.slug : []).join('/'));

    const locale = context.locale || context.defaultLocale;
    dayjs.extend(updateLocale);
    dayjs.extend(timeZone);
    dayjs.extend(localizedFormat);
    if (locale) {
        dayjs.locale(locale);
    }
    dayjs.tz.setDefault(config.tz);
    return await getBlocksProps(context, blocks);
};

export default Page;
