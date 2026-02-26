import { cache } from 'react';
import config from '../../../sklinet.config.json';
import { getItemFromPageResponse } from '../../utils/base/getItemFromPageResponse';
import { getStaticProps } from '../../utils/base/getStaticProps';
import { ContextProps, ServerContextProps } from '../../types/base/page';
import { IApp } from '../../types/base/app';
import { pageInfoLog } from '../../utils/base/pageInfoLog';
import providers from '../../providers';
import blocks from '../blocks/server';
import { PageContent } from '../components/base/PageContent/PageContent';

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

const getPageData = cache(async (context: ContextProps) => {
    const data = await getStaticProps(context);

    return data;
});

export const Page = async ({ params, searchParams }: ServerContextProps) => {
    const context = {
        params: await params,
        searchParams: await searchParams,
    };

    const data = await getPageData(context);

    const app: IApp = {
        ...data,
        item: getItemFromPageResponse(data),
        context,
    };

    if (process.env.NODE_ENV === 'development') {
        pageInfoLog(app);
    }

    return <PageContent app={app} />;
};

export default Page;
