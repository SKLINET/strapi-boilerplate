import { GetStaticPathsResult } from 'next';
import { fetchQuery } from 'react-relay';
import { pageDetailQuery, pageListQuery, pageStaticPathsQuery } from '../relay/page';
import * as d from '../relay/__generated__/pageDetailQuery.graphql';
import * as l from '../relay/__generated__/pageListQuery.graphql';
import * as s from '../relay/__generated__/pageStaticPathsQuery.graphql';
import { AppQuery } from '../relay/app';
import { BlockType, getPagePattern, getStaticParamsFromBlocks } from '@symbio/headless';
import { ParsedUrlQuery } from 'querystring';
import providers from './index';
import { PageProps } from '../types/page';
import { WebSettingsProps } from '../types/webSettings';
import { Locale } from '../types/locale';
import config from '../../sklinet.config.json';
import { Providers } from '../types/providers';
import getPublicationState from '../utils/getPublicationState';
import StrapiProvider from './StrapiProvider';
import { AppData } from '../index';
import { StaticPathsParams } from '../types/staticPathsParams';

class PageProvider extends StrapiProvider<d.pageDetailQuery, l.pageListQuery> {
    private entityId: string | null = null;

    public setEntityId(id: string | null) {
        this.entityId = id;
    }
    /**
     * Special function returning Page and Site data
     * @param locale
     * @param slug
     * @param preview
     */
    // ** TODO ** fix any, Strapi GQL structure doesn't match our needs in PageProps
    async getPageBySlug(
        locale: string | undefined,
        slug: string[],
        preview: boolean | undefined,
    ): Promise<AppData<PageProps, WebSettingsProps> | undefined> {
        const pattern = getPagePattern(slug);
        const publicationState = getPublicationState(preview);
        const data = await fetchQuery<any>(this.getEnvironment(preview), AppQuery, {
            locale,
            pattern,
            publicationState,
            entityId: this.entityId ? parseInt(this.entityId) : null,
        }).toPromise();
        return { ...data, page: { ...data?.page, ...data?.page?.attributes } };
    }

    async getStaticPaths(
        locale: string | undefined,
        blocks?: Record<string, BlockType<PageProps, WebSettingsProps, Providers, Locale>>,
    ): Promise<GetStaticPathsResult['paths']> {
        const items: StaticPathsParams[] = [];
        let cnt = -1;
        let done = 0;
        do {
            const data = await fetchQuery<s.pageStaticPathsQuery>(this.getEnvironment(), pageStaticPathsQuery, {
                locale: locale,
                start: 0,
                limit: 100,
            }).toPromise();

            if (data) {
                if (cnt === -1) {
                    cnt = Number(data?.pages?.meta?.pagination?.total);
                }
                // loop over all pages
                for (const page of data?.pages?.data || []) {
                    if (String(page?.attributes?.url) === 'homepage' && page?.attributes?.sitemap) {
                        items.push({
                            params: {
                                slug: [],
                                sitemap: {
                                    enabled: page?.attributes?.sitemap?.enabled || false,
                                    changeFrequency: page?.attributes?.sitemap?.changeFrequency || 'monthly',
                                    priority: page?.attributes?.sitemap?.priority || 0.3,
                                },
                            },
                        });
                        continue;
                    }
                    if (String(page?.attributes?.url) === '404') {
                        continue;
                    }
                    const url = page?.attributes?.url;
                    if (url && blocks) {
                        const blocksParams = await getStaticParamsFromBlocks<
                            PageProps,
                            WebSettingsProps,
                            Providers,
                            Locale
                        >(page.attributes.content, locale ?? '', providers, blocks);
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
                                            enabled: page?.attributes?.sitemap?.enabled || false,
                                            changeFrequency: page?.attributes?.sitemap?.changeFrequency || 'monthly',
                                            priority: page?.attributes?.sitemap?.priority || 0.3,
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
                                        enabled: page?.attributes?.sitemap?.enabled || false,
                                        changeFrequency: page?.attributes?.sitemap?.changeFrequency || 'monthly',
                                        priority: page?.attributes?.sitemap?.priority || 0.3,
                                    },
                                },
                            });
                        }
                    }
                }

                done += data?.pages?.data?.length || 0;
            }
        } while (done < cnt);

        return items.map((item: StaticPathsParams) => ({
            params: { slug: item?.params?.slug, locale: locale, sitemap: item.params?.sitemap } as any,
            locale,
        }));
    }
}

export default new PageProvider(pageDetailQuery, pageListQuery, {
    id: '',
    apiKey: 'page',
    locales: config.i18n.locales,
});
