import { GoogleTagManager } from '@next/third-parties/google';
import { Layout } from '../components/base/Layout/Layout';
import { Blocks } from '../components/base/Blocks/Blocks';
import { PreviewToolbar } from '../components/base/PreviewToolbar/PreviewToolbar';
import { GridHelper } from '../components/base/GridHelper/GridHelper';
import { getItemFromPageResponse } from '../../utils/base/getItemFromPageResponse';
import { getStaticProps } from '../../utils/base/getStaticProps';
import { ContextProps } from '../../types/base/page';
import { IApp } from '../../types/base/app';
import config from '../../../sklinet.config.json';

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

export const Page = async (context: ContextProps) => {
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

    const gtmCode = app.webSetting?.gtmCode || config.gtm.code || null;

    return (
        <>
            {gtmCode && <GoogleTagManager gtmId={String(gtmCode)} />}

            <Layout app={app}>
                {app.page && (
                    <Blocks blocksData={app.page?.content || []} initialProps={app.blocksPropsMap} app={app} />
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
