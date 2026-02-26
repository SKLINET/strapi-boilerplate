'use cache';

import { ReactElement } from 'react';
import { IApp } from '../../../../types/base/app';
import { cacheLife } from 'next/cache';
import config from '../../../../../sklinet.config.json';
import { GtmProvider } from '../GtmProvider/GtmProvider';
import { Layout } from '../Layout/Layout';
import { Blocks } from '../Blocks/Blocks';
import Script from 'next/script';
import { cacheTag } from '../../../../utils/cache/tag';
import { GridHelper } from '../GridHelper/GridHelper';
import { DataModal } from '../DataModal/DataModal';
import { PreviewToolbar } from '../PreviewToolbar/PreviewToolbar';

interface PageContentProps {
    app: IApp;
}

const PageContent = async ({ app }: PageContentProps): Promise<ReactElement> => {
    // Set cache life to max (revalidate all / re-deploy)
    cacheLife('max');

    // Set cache tags for global content (AppDataQuery and AppRedirectQuery)
    cacheTag('menu');
    cacheTag('redirect');
    cacheTag('system-resource');
    cacheTag('web-setting');

    // Set cache tags for page content (AppPageQuery)
    if (app.page?.documentId) cacheTag('page', app.page.documentId);

    const gtmCode = app.webSetting?.gtmCode || config.gtm.code || null;

    const structuredData = app?.item?.seo?.structuredData || app?.page?.seo?.structuredData || null;

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

export { PageContent };
