import React, { ReactElement, useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
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

const resolvePage = (page: PageProps | undefined, blocksProps: any) => {
    if (!page) {
        return <></>;
    }
    return <Blocks blocksData={page?.blocks} initialProps={blocksProps} />;
};

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
                showSpinner,
                setShowSpinner,
                systemResources: systemResources?.data?.map((d: any) => d?.attributes) || [],
                ...webSetting,
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
            <Layout>{resolvePage(page, blocksProps)}</Layout>
        </AppContext.Provider>
    );
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
    return await getBlocksProps({ ...context, params: { ...context.params, slug: ['404'] } }, blocks);
};
export default Page;
