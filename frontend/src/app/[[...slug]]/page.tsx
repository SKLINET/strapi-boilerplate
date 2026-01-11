import dynamic from 'next/dynamic';
import { Layout } from '../components/base/Layout/Layout';
import { Blocks } from '../components/base/Blocks/Blocks';
import { GtmProvider } from '../components/base/GtmProvider/GtmProvider';
import { getItemFromPageResponse } from '../../utils/base/getItemFromPageResponse';
import { getStaticProps } from '../../utils/base/getStaticProps';
import { ServerContextProps } from '../../types/base/page';
import { IApp } from '../../types/base/app';
import config from '../../../sklinet.config.json';
import { configureDayjs } from '../../utils/configureDayjs';
import Script from 'next/script';
import { pageInfoLog } from '../../utils/base/pageInfoLog';

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

    configureDayjs(app);

    const gtmCode = app.webSetting?.gtmCode || config.gtm.code || null;

    const structuredData = app?.item?.seo?.structuredData || app?.page?.seo?.structuredData || null;

    if (process.env.NODE_ENV === 'development') {
        pageInfoLog(app);
    }

    return (
        <>
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

            {structuredData && (
                <Script
                    id="structured-data"
                    type="application/ld+json"
                    strategy="beforeInteractive"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            )}
        </>
    );
};

export default Page;
