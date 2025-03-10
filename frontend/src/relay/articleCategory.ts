import { graphql } from 'relay-runtime';

export const ArticleCategoryListQuery = graphql`
    query articleCategoryListQuery(
        $locale: I18NLocaleCode
        $start: Int
        $limit: Int
        $filter: ArticleCategoryFiltersInput
        $status: PublicationStatus
        $sort: [String] = ["publishedAt:asc"]
    ) {
        items: articleCategories(
            locale: $locale
            pagination: { start: $start, limit: $limit }
            sort: $sort
            filters: $filter
            status: $status
        ) {
            ...articleCategoryFragment @relay(mask: false)
        }
    }
`;

graphql`
    fragment articleCategoryFragment on ArticleCategory {
        documentId
        title
    }
`;
