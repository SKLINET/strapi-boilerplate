import dayjs from 'dayjs';
import AbstractStrapiProvider from '../lib/provider/AbstractStrapiProvider';
import { ArticleCategoryListQuery } from '../relay/articleCategory';

class ArticleCategoryProvider extends AbstractStrapiProvider<any, any> {
    getApiKey(): string {
        return 'article-category';
    }

    isSitemapEnabled(): boolean {
        return false;
    }

    getId(): string {
        return 'api::article-category.article-category';
    }

    getFilterParams(publicationState = ''): Record<string, Record<string, string | boolean>> {
        if (publicationState?.toLowerCase() === 'preview') {
            // return { publishedAt: { lte: dayjs().format() }, isVisibleInListView: { eq: true } };
            return { publishedAt: { lte: dayjs().format() } };
        }
        return { publishedAt: { lte: dayjs().format() } };
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new ArticleCategoryProvider(ArticleCategoryListQuery, ArticleCategoryListQuery);
