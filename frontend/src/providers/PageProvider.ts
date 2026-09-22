import { GetStaticPathsResult } from 'next';
import { fetchQuery } from 'relay-runtime';
import { pageDetailQuery, pageListQuery, pageStaticPathsQuery } from '../relay/page';
import * as d from '../relay/__generated__/pageDetailQuery.graphql';
import * as l from '../relay/__generated__/pageListQuery.graphql';
import * as s from '../relay/__generated__/pageStaticPathsQuery.graphql';
import { AppDataQuery, AppPageQuery, AppRedirectQuery } from '../relay/app';
import { appPageQuery } from '../relay/__generated__/appPageQuery.graphql';
import { appDataQuery } from '../relay/__generated__/appDataQuery.graphql';
import { appRedirectQuery } from '../relay/__generated__/appRedirectQuery.graphql';
import providers from './index';
import { PageProps } from '../types/base/page';
import { WebSettingsProps } from '../types/base/webSettings';
import { Locale } from '../types/base/locale';
import { Providers } from '../types/base/providers';
import getPublicationState from '../utils/base/getPublicationState';
import { StaticPathsParams } from '../types/base/staticPathsParams';
import AbstractStrapiProvider from '../lib/provider/AbstractStrapiProvider';
import { getPagePattern } from '../lib/routing/getPagePattern';
import { BlockType } from '../types/base/block';
import { getStaticParamsFromBlocks } from '../utils/base/getStaticParamsFromBlocks';
import { MetadataGlobalQuery, MetadataPageQuery } from '../relay/metadata';
import { metadataGlobalQuery } from '../relay/__generated__/metadataGlobalQuery.graphql';
import { metadataPageQuery } from '../relay/__generated__/metadataPageQuery.graphql';
import { cachedAppRedirect, cachedGlobalMetadata } from '../utils/cache/cachedGlobalMetadata';
import config from '../../sklinet.config.json';

class PageProvider extends AbstractStrapiProvider<
    d.pageDetailQuery,
    l.pageListQuery,
    NonNullable<d.pageDetailQuery$data['item']>,
    any
> {
    getApiKey(): string {
        return 'page';
    }

    isSitemapEnabled(): boolean {
        return true;
    }

    getId(): string {
        return 'api::page.page';
    }

    /**
     * Special function returning Page and Site data
     * @param locale
     * @param slug
     * @param preview
     */
    async getPageBySlug(locale: string | undefined, slug: string[], preview: boolean | undefined) {
        const pattern = getPagePattern(slug);
        const status = getPublicationState(preview);

        const appData = await fetchQuery<appDataQuery>(
            this.getEnvironment({ preview, withoutCache: true }),
            AppDataQuery,
            {
                locale,
                status,
            },
        ).toPromise();

        const appPage = await fetchQuery<appPageQuery>(
            this.getEnvironment({ preview, withoutCache: true }),
            AppPageQuery,
            {
                locale,
                pattern,
                status,
            },
        ).toPromise();

        return {
            ...appData,
            page: appPage?.page || null,
        };
    }

    /**
     * Special function returning Page metadata
     * @param locale
     * @param slug
     * @param preview
     */
    async getPageMetadata(locale: string | undefined, slug: string[], preview: boolean | undefined) {
        const pattern = getPagePattern(slug);
        const status = getPublicationState(preview);
        const redirect = '/' + (Array.isArray(slug) ? slug : []).join('/');

        // Global settings and the redirect table are the same for every URL, so they live in their
        // own `'use cache'` entries rather than being refetched per page. Preview must never write
        // to those entries, so it queries Strapi directly instead.
        const [metadataGlobal, appRedirect, metadataPage] = await Promise.all([
            preview
                ? fetchQuery<metadataGlobalQuery>(this.getEnvironment({ preview }), MetadataGlobalQuery, {
                      locale,
                      status,
                  }).toPromise()
                : cachedGlobalMetadata(locale || config.i18n.defaultLocale),
            preview
                ? fetchQuery<appRedirectQuery>(this.getEnvironment({ preview }), AppRedirectQuery, {
                      redirect,
                      status,
                  }).toPromise()
                : cachedAppRedirect(redirect),
            fetchQuery<metadataPageQuery>(
                // No `tags`: the page metadata is already covered by the `cachedMetadata` entry
                // above it, and a second cache layer with its own lifetime would rebuild that entry
                // from stale data after a revalidation.
                this.getEnvironment({ preview, withoutCache: true }),
                MetadataPageQuery,
                {
                    locale,
                    pattern,
                    status,
                },
            ).toPromise(),
        ]);

        return {
            ...metadataGlobal,
            redirect: appRedirect?.redirect
                ? { ...appRedirect?.redirect, permanent: appRedirect?.redirect?.statusCode === '301' }
                : null,
            page: metadataPage?.page || null,
        };
    }

    /**
     * @description Get static paths for all pages
     * @param {string} locale - Locale to get the paths for
     * @param {Record<string, BlockType>} blocks - Blocks to get the paths for
     * @returns {Promise<GetStaticPathsResult['paths']>} The static paths
     **/
    async getStaticPaths(
        locale: string | undefined,
        blocks?: Record<string, BlockType>,
    ): Promise<GetStaticPathsResult['paths']> {
        const items: StaticPathsParams[] = [];
        let cnt = -1;
        let done = 0;
        do {
            const data = await fetchQuery<s.pageStaticPathsQuery>(
                // Build-time path enumeration; the fetch cache would only hold a snapshot nothing
                // reads again, so it stays out of it.
                this.getEnvironment({ preview: false, withoutCache: true }),
                pageStaticPathsQuery,
                {
                    locale: locale,
                    start: 0,
                    limit: 100,
                },
            ).toPromise();

            if (data) {
                if (cnt === -1) {
                    cnt = Number(data?.pages?.length || 0);
                }
                // loop over all pages
                for (const page of data?.pages || []) {
                    if (String(page?.url) === 'homepage' && page?.sitemap) {
                        items.push({
                            params: {
                                slug: [],
                                sitemap: {
                                    enabled: page?.sitemap?.enabled || false,
                                    changeFrequency: page?.sitemap?.changeFrequency || 'monthly',
                                    priority: page?.sitemap?.priority || 0.3,
                                },
                            },
                        });
                        continue;
                    }
                    if (String(page?.url) === '404') {
                        continue;
                    }
                    if (String(page?.url) === '500') {
                        continue;
                    }
                    const url = page?.url;
                    if (url && blocks) {
                        const blocksParams = await getStaticParamsFromBlocks<
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            PageProps,
                            WebSettingsProps,
                            Providers,
                            Locale
                        >(page?.content as any, locale ?? '', providers, blocks);
                        if (blocksParams.length > 0) {
                            for (const blockParams of blocksParams) {
                                let newUrl = url;
                                for (const key in blockParams) {
                                    if (Object.prototype.hasOwnProperty.call(blockParams, key)) {
                                        if (key === '*') {
                                            newUrl = newUrl.replace('/*', '/' + String(blockParams[key]));
                                        } else {
                                            newUrl = newUrl?.replace(
                                                new RegExp('/:' + key + '(\\/|$)'),
                                                String('/' + blockParams[key] + '$1'),
                                            );
                                        }
                                    }
                                }
                                // build slug array
                                const pathParts = newUrl.split('/');
                                items.push({
                                    params: {
                                        slug: pathParts,
                                        locale,
                                        sitemap: {
                                            enabled: page?.sitemap?.enabled || false,
                                            changeFrequency: page?.sitemap?.changeFrequency || 'monthly',
                                            priority: page?.sitemap?.priority || 0.3,
                                        },
                                    },
                                });
                            }
                        } else {
                            // build slug array
                            const pathParts = url.split('/');
                            items.push({
                                params: {
                                    slug: pathParts,
                                    locale,
                                    sitemap: {
                                        enabled: page?.sitemap?.enabled || false,
                                        changeFrequency: page?.sitemap?.changeFrequency || 'monthly',
                                        priority: page?.sitemap?.priority || 0.3,
                                    },
                                },
                            });
                        }
                    }
                }

                done += data?.pages?.length || 0;
            }
        } while (done < cnt);

        return items.map((item: StaticPathsParams) => ({
            params: { slug: item?.params?.slug, locale: locale, sitemap: item.params?.sitemap } as any,
            locale,
        }));
    }
}

export default new PageProvider(pageDetailQuery, pageListQuery);
