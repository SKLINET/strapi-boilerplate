import config from '../../../sklinet.config.json';
import { getItemFromPageResponse } from '../../utils/base/getItemFromPageResponse';
import { getStaticProps } from '../../utils/base/getStaticProps';
import { ContextProps, ServerContextProps } from '../../types/base/page';
import { IApp } from '../../types/base/app';
import { pageInfoLog } from '../../utils/base/pageInfoLog';
import providers from '../../providers';
import blocks from '../blocks/server';
import { GtmProvider } from '../components/base/GtmProvider/GtmProvider';
import { Layout } from '../components/base/Layout/Layout';
import { Blocks } from '../components/base/Blocks/Blocks';
import { PreviewToolbar } from '../components/base/PreviewToolbar/PreviewToolbar';
import { DataModal } from '../components/base/DataModal/DataModal';
import { GridHelper } from '../components/base/GridHelper/GridHelper';
import Script from 'next/script';
import { cachePage } from '../../utils/cache/page';
import { cacheLife } from 'next/cache';

/**
 * @description Pregenerate pages for ISR
 * @returns {Promise<{ slug: string[] }[]>} All static paths for each locale
 **/
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
            const webSetting = await providers.webSetting.get(locale, { preview: false });

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

/**
 * @description Get page data for a given slug and cache it (search params are ignored)
 * @param {ContextProps} context - Context props
 * @returns {Promise<IApp>} App data
 **/
const cachedStaticProps = async (context: ContextProps): Promise<IApp> => {
    'use cache';
    const data = await getStaticProps(context);

    const app: IApp = {
        ...data,
        item: getItemFromPageResponse(data),
        context,
    };

    if (!app?.page || app.page.url === '404' || app.page.url === '500') {
        // Cache error page for 1 minute (min. by NextJS documentation)
        cacheLife('minutes');
    } else {
        // Cache page by tags based on the page content
        cachePage(app);
    }

    return app;
};

export const Page = async ({ params, searchParams }: ServerContextProps) => {
    const context = {
        params: await params,
        searchParams: {},
    };

    const app = await cachedStaticProps(context);

    if (process.env.NODE_ENV === 'development') {
        pageInfoLog(app);
    }

    const gtmCode = app.webSetting?.gtmCode || config.gtm.code || null;

    const structuredData = app?.item?.seo?.structuredData || app?.page?.seo?.structuredData || null;

    return (
        <>
            <GtmProvider gtmCode={gtmCode}>
                <Layout app={app}>
                    {app.page && (
                        <Blocks
                            blocksData={app.page?.content || []}
                            initialProps={app.blocksPropsMap}
                            app={app}
                            searchParams={searchParams}
                        />
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
