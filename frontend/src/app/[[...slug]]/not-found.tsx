import { IApp } from '../../types/app';
import { getItemFromPageResponse } from '../../utils/getItemFromPageResponse';
import { Blocks } from '../components/base/Blocks/Blocks';
import { getStaticProps } from '../../utils/getStaticProps';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import timeZone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { CALENDAR_FORMATS } from '../../constants';
import config from '../../../sklinet.config.json';
import { GridHelper } from '../components/primitives/GridHelper/GridHelper';
import { PreviewToolbar } from '../components/primitives/PreviewToolbar/PreviewToolbar';
import { Layout } from '../components/base/Layout/Layout';

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
    if (app.locale) {
        dayjs.updateLocale(app.locale, { calendar: CALENDAR_FORMATS[app.locale] });
        dayjs.locale(app.locale);
    }
    dayjs.tz.setDefault(tz);

    const gtmCode = app.webSetting?.data?.attributes?.gtmCode || config.gtm.code || null;

    return (
        <>
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
