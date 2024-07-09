import { IApp } from '../../types/base/app';
import { getItemFromPageResponse } from '../../utils/base/getItemFromPageResponse';
import { Blocks } from '../components/base/Blocks/Blocks';
import { getStaticProps } from '../../utils/base/getStaticProps';
import config from '../../../sklinet.config.json';
import { GridHelper } from '../components/base/GridHelper/GridHelper';
import { PreviewToolbar } from '../components/base/PreviewToolbar/PreviewToolbar';
import { Layout } from '../components/base/Layout/Layout';
import { GoogleTagManager } from '@next/third-parties/google';

// Day JS
import { CALENDAR_FORMATS } from '../../constants';
import dayjs from 'dayjs';

// Day JS locales
import 'dayjs/locale/cs';
import 'dayjs/locale/en';

// Day JS plugins
import updateLocale from 'dayjs/plugin/updateLocale';
import timeZone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';

export const Page = async () => {
    const context = { params: { slug: ['404'] }, searchParams: {} };
    const data = await getStaticProps(context);

    const app: IApp = {
        ...data,
        item: getItemFromPageResponse(data),
        context,
    };

    const { tz } = config;

    dayjs.extend(updateLocale);
    dayjs.extend(timeZone);
    dayjs.extend(localizedFormat);
    dayjs.updateLocale(app.locale, { calendar: CALENDAR_FORMATS[app.locale] });
    dayjs.locale(app.locale);
    dayjs.tz.setDefault(tz);

    const gtmCode = app.webSetting?.data?.attributes?.gtmCode || config.gtm.code || null;

    return (
        <>
            {gtmCode && <GoogleTagManager gtmId={String(gtmCode)} />}

            <Layout app={app}>
                {app.page && (
                    <Blocks
                        blocksData={app.page?.attributes?.content || []}
                        initialProps={app.blocksPropsMap}
                        app={app}
                    />
                )}
            </Layout>

            {app.preview && app.page && <PreviewToolbar app={app} />}
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

export default Page;
