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
import { appQuery } from '../relay/__generated__/appQuery.graphql';

class PageProvider extends StrapiProvider<d.pageDetailQuery, l.pageListQuery> {
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
    ): Promise<AppData<any, WebSettingsProps> | undefined> {
        const pattern = getPagePattern(slug);
        const publicationState = getPublicationState();
        return await fetchQuery<any>(this.getEnvironment(), AppQuery, {
            locale,
            pattern,
            publicationState,
        }).toPromise();
    }

    // ** TODO ** fix any, Strapi GQL structure doesn't match our needs
    async getStaticPaths(
        locale: string | undefined,
        blocks?: Record<string, BlockType<any, WebSettingsProps, Providers, Locale>>, // ** TODO ** PageProps
    ): Promise<GetStaticPathsResult['paths']> {
        const params: ParsedUrlQuery[] = [];
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
                    if (String(page?.attributes?.url) === 'homepage') {
                        params.push({ slug: [] });
                        continue;
                    }
                    if (String(page?.attributes?.url) === '404') {
                        continue;
                    }
                    const url = page?.attributes?.url;

                    if (url && blocks) {
                        // ** TODO ** fix any, Strapi GQL structure doesn't match our needs - PageProps
                        const blocksParams = await getStaticParamsFromBlocks<any, WebSettingsProps, Providers, Locale>(
                            page.attributes.blocks,
                            locale ?? '',
                            providers,
                            blocks,
                        );

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
                                params.push({ slug: pathParts, locale });
                            }
                        } else {
                            // build slug array
                            const pathParts = url.split('/');
                            params.push({ slug: pathParts, locale });
                        }
                    }
                }

                done += data?.pages?.data?.length || 0;
            }
        } while (done < cnt);
        return params.map((p) => ({
            params: p,
            locale,
        }));
    }
}

export default new PageProvider(pageDetailQuery, pageListQuery, {
    id: '',
    apiKey: '',
    locales: config.i18n.locales,
});
