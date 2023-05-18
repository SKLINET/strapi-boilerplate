import dayjs from 'dayjs';
import { fetchQuery } from 'react-relay';
import { GetStaticPathsResult } from 'next';
import { newsDetailQuery, newsListQuery, newsStaticPathsQuery } from '../relay/news';
import * as s from '../relay/__generated__/newsStaticPathsQuery.graphql';
import config from '../../sklinet.config.json';
import StrapiProvider from './StrapiProvider';
import { StaticPathsParams } from '../types/staticPathsParams';

class NewsProvider extends StrapiProvider<any, any> {
    getFilterParams(): Record<string, Record<string, string | boolean>> {
        return { publishDate: { lte: dayjs().format() }, slug: { ne: 'null' } };
    }

    async getStaticPaths(locale: string): Promise<GetStaticPathsResult['paths']> {
        const items = [];
        const data = await fetchQuery<s.newsStaticPathsQuery>(this.getEnvironment(), newsStaticPathsQuery, {
            locale: locale,
        }).toPromise();

        if (data) {
            for (const news of data.articles?.data || []) {
                items.push({
                    params: {
                        slug: [news.attributes?.url || ''],
                        locale,
                        sitemap: {
                            enabled: news?.attributes?.sitemap?.enabled || false,
                            changeFrequency: news?.attributes?.sitemap?.changeFrequency || 'monthly',
                            priority: news?.attributes?.sitemap?.priority || 0.3,
                        },
                    },
                });
            }
        }
        return items.map((item: StaticPathsParams) => ({
            params: { slug: item?.params?.slug, locale: locale, sitemap: item.params?.sitemap } as any,
            locale,
        }));
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new NewsProvider(newsDetailQuery, newsListQuery, {
    locales: config.i18n.locales,
    id: '',
    apiKey: 'article',
});
