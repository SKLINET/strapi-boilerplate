import dayjs from 'dayjs';
import { ParsedUrlQuery } from 'querystring';
import { fetchQuery } from 'react-relay';
import { GetStaticPathsResult } from 'next';
import { DatoCMSProvider as AbstractDatoCMSProvider } from '@symbio/cms-datocms';
import { newsDetailQuery, newsListQuery, newsStaticPathsQuery } from '../relay/news';
import * as d from '../relay/__generated__/newsDetailQuery.graphql';
import * as l from '../relay/__generated__/newsListQuery.graphql';
import * as s from '../relay/__generated__/newsStaticPathsQuery.graphql';
import { SiteLocale } from '../relay/__generated__/appQuery.graphql';
import symbio from '../../symbio.config.json';
import models from '../models.json';

class NewsProvider extends AbstractDatoCMSProvider<d.newsDetailQuery, l.newsListQuery> {
    getFilterParams(): Record<string, Record<string, string | boolean>> {
        return { dateFrom: { lte: dayjs().format() }, slug: { neq: 'null' }, title: { exists: true } };
    }

    async getStaticPaths(locale: string): Promise<GetStaticPathsResult['paths']> {
        const params: ParsedUrlQuery[] = [];

        const data = await fetchQuery<s.newsStaticPathsQuery>(this.getEnvironment(false), newsStaticPathsQuery, {
            locale: locale as SiteLocale,
        }).toPromise();

        if (data) {
            for (const news of data.allNews) {
                params.push({
                    slug: news.id + '-' + news.slug,
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
    id: models['news'],
    locales: symbio.i18n.locales,
    apiKey: 'news',
});
