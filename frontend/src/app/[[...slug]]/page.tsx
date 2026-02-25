import config from '../../../sklinet.config.json';
import dynamicImport from 'next/dynamic';
import { Layout } from '../components/base/Layout/Layout';
import { Blocks } from '../components/base/Blocks/Blocks';
import { GtmProvider } from '../components/base/GtmProvider/GtmProvider';
import { getItemFromPageResponse } from '../../utils/base/getItemFromPageResponse';
import { getStaticProps } from '../../utils/base/getStaticProps';
import { ServerContextProps } from '../../types/base/page';
import { IApp } from '../../types/base/app';
import { configureDayjs } from '../../utils/configureDayjs';
import Script from 'next/script';
import { pageInfoLog } from '../../utils/base/pageInfoLog';
import providers from '../../providers';
import blocks from '../blocks/server';

const PreviewToolbar = dynamicImport(() =>
    import('../components/base/PreviewToolbar/PreviewToolbar').then((mod) => mod.PreviewToolbar),
);
const GridHelper = dynamicImport(() =>
    import('../components/base/GridHelper/GridHelper').then((mod) => mod.GridHelper),
);
const DataModal = dynamicImport(() => import('../components/base/DataModal/DataModal').then((mod) => mod.DataModal));

// - - - - - - - - -
// ISR Configuration
// - - - - - - - - -
// - revalidate every 1 year
export const revalidate = 60 * 60 * 24 * 365;
// - auto generation because we have dynamic segments (cookie, search params, etc.)
export const dynamic = 'auto';
// - dynamic segments are generated on demand
export const dynamicParams = true;

// Generate static params for ISR
export async function generateStaticParams() {
    const { locales } = config.i18n;
    const allParams: { slug: string[] }[] = [];

    if (process.env.NODE_ENV === 'development') {
        return [{ slug: [] }];
    }

    // Get static paths for each locale
    for (const locale of locales) {
        const addPage = (slug: string[]) => {
            const _slug = slug.filter((e) => !!e);

            if (locale === config.i18n.defaultLocale) {
                allParams.push({
                    slug: _slug,
                });
            } else {
                allParams.push({
                    slug: [locale, ..._slug],
                });
            }
        };

        try {
            const webSetting = await providers.webSetting.get(locale, false);

            if (!webSetting) throw new Error('Web setting are not filled');

            const { articleDetailPage } = webSetting;

            const pageProvider = providers.page;
            const staticPaths = await pageProvider.getStaticPaths(locale, blocks);

            // Convert static paths to the format expected by generateStaticParams
            for (const path of staticPaths) {
                if (typeof path === 'object' && path.params?.slug) {
                    const slug = Array.isArray(path.params.slug) ? path.params.slug : [path.params.slug];
                    const url = slug.join('/');

                    // For homepage specific pattern
                    if (url.startsWith('homepage')) {
                        addPage(['']);
                        continue;
                    }

                    // Exclude 404 page
                    if (url.startsWith('404')) {
                        continue;
                    }

                    // Exclude 500 page
                    if (url.startsWith('500')) {
                        continue;
                    }

                    // For dynamic content
                    if (url.includes(':slug')) {
                        // Articles
                        if (articleDetailPage?.url === url) {
                            const articles = await providers.article.getStaticPaths(locale);

                            for (const path of articles) {
                                if (typeof path === 'object' && path.params?.slug) {
                                    const slug = Array.isArray(path.params.slug)
                                        ? path.params.slug
                                        : [path.params.slug];

                                    addPage(articleDetailPage.url.replace(':slug', slug.join('/')).split('/'));
                                }
                            }

                            continue;
                        }

                        continue;
                    }

                    // For other pages
                    addPage(slug);
                }
            }
        } catch (error) {
            console.error(
                `⚠️  Error generating static params for locale ${locale.toUpperCase()} -`,
                (error as Error)?.message,
            );
        }
    }

    // Remove duplicates
    const uniqueParams = allParams.filter(
        (param, index, self) => index === self.findIndex((p) => JSON.stringify(p.slug) === JSON.stringify(param.slug)),
    );

    if (uniqueParams.length === 0) {
        return [{ slug: [] }];
    }

    return uniqueParams;
}

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
