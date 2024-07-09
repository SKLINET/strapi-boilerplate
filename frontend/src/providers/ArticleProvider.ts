import dayjs from 'dayjs';
import { fetchQuery } from 'relay-runtime';
import { GetStaticPathsResult } from 'next';
import * as s from '../relay/__generated__/articleStaticPathsQuery.graphql';
import AbstractStrapiProvider from '../lib/provider/AbstractStrapiProvider';
import { StaticPathsParams } from '../types/base/staticPathsParams';
import { ArticleDetailQuery, ArticleListQuery, ArticleStaticPathsQuery } from '../relay/article';

class ArticleProvider extends AbstractStrapiProvider<any, any> {
    getApiKey(): string {
        return 'article';
    }

    isSitemapEnabled(): boolean {
        return true;
    }

    getId(): string {
        return 'api::article.article';
    }

    getFilterParams(): Record<string, Record<string, string | boolean>> {
        return { publishDate: { lte: dayjs().format() }, slug: { ne: 'null' } };
    }

    async getStaticPaths(locale: string): Promise<GetStaticPathsResult['paths']> {
        const items = [];
        const data = await fetchQuery<s.articleStaticPathsQuery>(this.getEnvironment(), ArticleStaticPathsQuery, {
            locale: locale,
        }).toPromise();

        if (data) {
            for (const article of data.articles?.data || []) {
                items.push({
                    params: {
                        slug: [article.attributes?.slug || ''],
                        locale,
                        sitemap: {
                            enabled: article?.attributes?.sitemap?.enabled || false,
                            changeFrequency: article?.attributes?.sitemap?.changeFrequency || 'monthly',
                            priority: article?.attributes?.sitemap?.priority || 0.3,
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
export default new ArticleProvider(ArticleDetailQuery, ArticleListQuery);
