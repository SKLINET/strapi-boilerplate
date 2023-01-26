import React, { ReactElement, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import timeZone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import blocks from '../blocks/server';
import { Blocks } from '../components/base/Blocks/Blocks';
import { Head } from '../components/base/Head/Head';
import { Layout } from '../components/base/Layout/Layout';
import { CALENDAR_FORMATS } from '../constants';
import providers from '../providers';
import config from '../../sklinet.config.json';
import { Logger } from '@symbio/headless/services';
import { AppStore, getBlocksProps, MyPageProps } from '@symbio/headless';
import { PageProps } from '../types/page';
import { WebSettingsProps } from '../types/webSettings';
import NextNprogress from 'nextjs-progressbar';
import { PreviewToolbar } from '../components/primitives/PreviewToolbar/PreviewToolbar';
import { getSlug } from '@symbio/headless/utils';
import { getMenuType } from '../utils/getMenuType';
import { ISystemResources } from '../types/systemResources';

const GridHelper = dynamic(import('../components/primitives/GridHelper/GridHelper').then((mod) => mod.GridHelper));

const Page = (props: MyPageProps<PageProps, WebSettingsProps> & ISystemResources): ReactElement => {
    const { hostname, site, page, webSetting, blocksPropsMap, redirect, preview, systemResources } = props;
    const { gtm, tz } = config;
    let item = Array.isArray(blocksPropsMap) && blocksPropsMap.length > 0 ? blocksPropsMap[0].item : undefined;
    if (!item && blocksPropsMap && Object.keys(blocksPropsMap)?.length > 0) {
        const firstKey = Object.keys(blocksPropsMap)[0];
        item = ((blocksPropsMap as Record<string, any>)[firstKey].item as Record<string, any>) || undefined;
    }

    const router = useRouter();
    const locale = router.locale || router.defaultLocale;
    const currentUrl =
        '/' + (router.locale === router.defaultLocale ? '' : router.locale) + router.asPath !== '/'
            ? router.asPath
            : '';
    const app = useMemo(
        () => ({
            currentUrl,
            hostname,
            page,
            site,
            item,
            webSetting,
            redirect,
            systemResources,
        }),
        [page],
    );
    if (router.isFallback) {
        return <div>Loading...</div>;
    }
    dayjs.extend(updateLocale);
    dayjs.extend(timeZone);
    dayjs.extend(localizedFormat);
    if (locale) {
        dayjs.updateLocale(locale, { calendar: CALENDAR_FORMATS[locale] });
        dayjs.locale(locale);
    }
    dayjs.tz.setDefault(tz);

    AppStore.getInstance<PageProps, WebSettingsProps>(app);

    const _mainMenu = getMenuType(webSetting?.data?.attributes?.mainMenu);
    const _footerMenu = getMenuType(webSetting?.data?.attributes?.footerMenu);

    return (
        <>
            <Head site={webSetting} page={page} item={item} />
            <NextNprogress color="#00B5EC" options={{ showSpinner: false }} />
            <Layout navbarData={{ menu: _mainMenu }} footerData={{ menu: _footerMenu }}>
                {page && (
                    <Blocks blocksData={page?.attributes?.content || []} initialProps={blocksPropsMap} app={app} />
                )}
            </Layout>

            {preview && page && <PreviewToolbar page={page} item={item} locale={locale} preview={preview} />}
            {process.env.NODE_ENV === 'development' && <GridHelper />}

            {gtm.code && (
                <noscript
                    dangerouslySetInnerHTML={{
                        __html: `<!-- Google Tag Manager (noscript) -->
                        <iframe src="https://www.googletagmanager.com/ns.html?id=${gtm.code}" height="0" width="0" style="display:none;visibility:hidden"></iframe>
                        <!-- End Google Tag Manager (noscript) -->`,
                    }}
                />
            )}
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
    const { ssg } = config;
    if (process.env.NODE_ENV !== 'development' && ssg.staticGeneration && locales) {
        const paths: GetStaticPathsResult['paths'] = [];
        const provider = providers.page;

        // loop over all locales
        for (const locale of locales) {
            const localePaths = await provider.getStaticPaths(locale, blocks);
            paths.push(...localePaths);
        }

        return {
            paths,
            fallback: false,
        };
    } else {
        return {
            paths: [],
            fallback: 'blocking',
        };
    }
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { tz } = config;
    const p = context.params;
    Logger.info('GET ' + '/' + (p && Array.isArray(p.slug) ? p.slug : []).join('/'));

    const locale = context.locale || context.defaultLocale;
    dayjs.extend(updateLocale);
    dayjs.extend(timeZone);
    dayjs.extend(localizedFormat);
    if (locale) {
        dayjs.updateLocale(locale, { calendar: CALENDAR_FORMATS[locale] });
        dayjs.locale(locale);
    }
    dayjs.tz.setDefault(tz);
    const renamedBlocks: Record<string, any> = {};
    for (const key in blocks) {
        renamedBlocks[`ComponentBlock${key}`] = blocks[key];
    }
    const pageProvider = providers.page;
    const slug = getSlug(context?.params?.slug || '');
    const previewData = (context?.previewData as Record<string, unknown>) || null;
    if (previewData?.pageId && slug === previewData?.pageSlug) {
        pageProvider.setEntityId(String(previewData?.pageId) || null);
    } else {
        pageProvider.setEntityId(null);
    }

    const res = (await getBlocksProps(context, providers, renamedBlocks, config.ssg)) as any;
    if (res.props.blocksPropsMap) {
        const blocks = Object.values(res.props.blocksPropsMap);
        if (blocks.some((block: any) => block.item === undefined && block.data === undefined)) {
            return { notFound: true };
        }
    }

    return res;
};

export default Page;
