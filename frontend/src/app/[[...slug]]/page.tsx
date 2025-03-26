import dynamic from 'next/dynamic';
import { Layout } from '../components/base/Layout/Layout';
import { Blocks } from '../components/base/Blocks/Blocks';
import { GtmProvider } from '../components/base/GtmProvider/GtmProvider';
import { getItemFromPageResponse } from '../../utils/base/getItemFromPageResponse';
import { getStaticProps } from '../../utils/base/getStaticProps';
import { ServerContextProps } from '../../types/base/page';
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

const PreviewToolbar = dynamic(() =>
    import('../components/base/PreviewToolbar/PreviewToolbar').then((mod) => mod.PreviewToolbar),
);
const GridHelper = dynamic(() => import('../components/base/GridHelper/GridHelper').then((mod) => mod.GridHelper));
const DataModal = dynamic(() => import('../components/base/DataModal/DataModal').then((mod) => mod.DataModal));

export const Page = async ({ params, searchParams }: ServerContextProps) => {
    const context = {
        params: await params,
        searchParams: await searchParams,
    };

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

    if (process.env.NODE_ENV === 'development') {
        console.log('');
        console.log('- - - - - - - - - - - - - - - -');
        console.log('💡 Page:', app?.page?.title || '');
        console.log('- - - - - - - - - - - - - - - -');
    }

    return (
        <GtmProvider gtmCode={gtmCode}>
            <Layout app={app}>
                {app.page && (
                    <Blocks blocksData={app.page?.content || []} initialProps={app.blocksPropsMap} app={app} />
                )}
            </Layout>

            {app.preview && app.page && <PreviewToolbar app={app} />}

            {process.env.NODE_ENV === 'development' && (
                <>
                    <GridHelper />
                    <DataModal app={app} />
                </>
            )}
        </GtmProvider>
    );
};

export default Page;
