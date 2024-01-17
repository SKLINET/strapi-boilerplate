import { graphql } from 'relay-runtime';

export const ArticleCategoryListQuery = graphql`
    query articleCategoryListQuery(
        $locale: I18NLocaleCode
        $start: Int
        $limit: Int
        $filter: ArticleCategoryFiltersInput
        $publicationState: PublicationState
        $sort: [String] = ["publishedAt:asc"]
    ) {
        items: articleCategories(
            locale: $locale
            pagination: { start: $start, limit: $limit }
            sort: $sort
            filters: $filter
            publicationState: $publicationState
        ) {
            meta {
                pagination {
                    total
                }
            }
            data {
                ...articleCategoryFragment @relay(mask: false)
            }
        }
    }
`;

graphql`
    fragment articleCategoryFragment on ArticleCategoryEntity {
        id
        attributes {
            title
        }
    }
`;
