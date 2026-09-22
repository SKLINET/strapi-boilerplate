import { Suspense } from 'react';
import config from '../../../sklinet.config.json';
import { IApp } from '../../types/base/app';
import { getItemFromPageResponse } from '../../utils/base/getItemFromPageResponse';
import { getLocale } from '../../utils/base/getLocal';
import { cachedStaticProps } from '../../utils/cache/cachedStaticProps';
import { configureDayjs } from '../../utils/configureDayjs';
import { Analytics } from '../components/base/Analytics/Analytics';
import { Blocks } from '../components/base/Blocks/Blocks';
import { Layout } from '../components/base/Layout/Layout';
import { PreviewToolbar } from '../components/base/PreviewToolbar/PreviewToolbar';
import { GridHelper } from '../components/base/GridHelper/GridHelper';
import { DataModal } from '../components/base/DataModal/DataModal';

const NOT_FOUND_SLUG = ['404'];

/**
 * Renders the CMS 404 page. Same contract as `Page`: no dynamic API may be read here, because every
 * block below has its own <Suspense> boundary and React rejects an element that postpones at its own
 * root while it also has postponed slots below. Draft mode is resolved inside `cachedStaticProps`.
 **/
export const NotFoundContent = async () => {
    const locale = getLocale(NOT_FOUND_SLUG);
    const data = await cachedStaticProps(NOT_FOUND_SLUG, locale);

    const app: IApp = {
        ...data,
        item: getItemFromPageResponse(data),
        context: { params: { slug: NOT_FOUND_SLUG } },
    };

    configureDayjs(app);

    const gtmCode = app.webSetting?.gtmCode || config.gtm.code || null;

    return (
        <>
            {/* Render analytics only if the user has not opted out */}
            <Suspense fallback={null}>
                <Analytics gtmCode={gtmCode ? String(gtmCode) : null} />
            </Suspense>

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
        </>
    );
};

const NotFound = () => (
    <Suspense fallback={<div aria-busy="true" aria-live="polite" />}>
        <NotFoundContent />
    </Suspense>
);

export default NotFound;
