import dayjs from 'dayjs';
import AbstractStrapiProvider from '../lib/provider/AbstractStrapiProvider';
import { ArticleCategoryListQuery } from '../relay/articleCategory';

class ArticleCategoryProvider extends AbstractStrapiProvider<any, any> {
    getApiKey(): string {
        return 'article-category';
    }

    isSitemapEnabled(): boolean {
        return true;
    }

    getId(): string {
        return 'api::article-category.article-category';
    }

    getFilterParams(): Record<string, Record<string, string | boolean>> {
        return { publishedAt: { lte: dayjs().format() } };
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new ArticleCategoryProvider(ArticleCategoryListQuery, ArticleCategoryListQuery);
