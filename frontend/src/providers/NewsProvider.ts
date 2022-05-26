import dayjs from 'dayjs';
import { ParsedUrlQuery } from 'querystring';
import { fetchQuery } from 'react-relay';
import { GetStaticPathsResult } from 'next';
import { newsDetailQuery, newsListQuery, newsStaticPathsQuery } from '../relay/news';
import * as d from '../relay/__generated__/articleDetailQuery.graphql';
import * as l from '../relay/__generated__/articleListQuery.graphql';
import * as s from '../relay/__generated__/newsStaticPathsQuery.graphql';
import config from '../../sklinet.config.json';
import StrapiProvider from './StrapiProvider';

class NewsProvider extends StrapiProvider<any, any> {
    getFilterParams(): Record<string, Record<string, string | boolean>> {
        return { dateFrom: { lte: dayjs().format() }, slug: { neq: 'null' }, title: { exists: true } };
    }

    async getStaticPaths(locale: string): Promise<GetStaticPathsResult['paths']> {
        const params: ParsedUrlQuery[] = [];
        const data = await fetchQuery<s.newsStaticPathsQuery>(this.getEnvironment(), newsStaticPathsQuery, {
            locale: locale,
        }).toPromise();

        if (data) {
            for (const news of data.articles?.data || []) {
                params.push({
                    slug: news.attributes?.slug || '',
                });
            }
        }

        return params.map((p) => ({
            params: p,
            locale,
        }));
    }
}

export default new NewsProvider(newsDetailQuery, newsListQuery, {
    locales: config.i18n.locales,
});
