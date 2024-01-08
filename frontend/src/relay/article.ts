import { graphql } from 'relay-runtime';

export const ArticleDetailQuery = graphql`
    query articleDetailQuery($slug: String, $id: String, $locale: String, $publicationState: String) {
        item: findSlug(
            modelName: "article"
            slug: $slug
            id: $id
            locale: $locale
            publicationState: $publicationState
        ) {
            ... on ArticleEntityResponse {
                data {
                    ...articleDetailFragment @relay(mask: false)
                }
            }
        }
    }
`;

export const ArticleListQuery = graphql`
    query articleListQuery(
        $locale: I18NLocaleCode
        $start: Int
        $limit: Int
        $filter: ArticleFiltersInput
        $publicationState: PublicationState
        $sort: [String] = ["publishDate:desc", "publishedAt:desc"]
    ) {
        items: articles(
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
                ...articleFragment @relay(mask: false)
            }
        }
    }
`;

export const ArticleStaticPathsQuery = graphql`
    query articleStaticPathsQuery($locale: I18NLocaleCode, $start: Int, $limit: Int, $filters: ArticleFiltersInput) {
        articles(locale: $locale, pagination: { start: $start, limit: $limit }, filters: $filters) {
            meta {
                pagination {
                    total
                }
            }
            data {
                ...articleDetailFragment @relay(mask: false)
            }
        }
    }
`;

graphql`
    fragment articleFragment on ArticleEntity {
        id
        attributes {
            title
            slug
            publishDate
            category {
                data {
                    ...articleCategoryFragment @relay(mask: false)
                }
            }
            image {
                ...appImageFragment @relay(mask: false)
            }
            content
        }
    }
`;

graphql`
    fragment articleDetailFragment on ArticleEntity {
        id
        attributes {
            title
            slug
            publishDate
            category {
                data {
                    ...articleCategoryFragment @relay(mask: false)
                }
            }
            image {
                ...appImageFragment @relay(mask: false)
            }
            content
            seo {
                ...appSeoFragment @relay(mask: false)
            }
            sitemap {
                ...appSitemapFragment @relay(mask: false)
            }
            localizations {
                data {
                    id
                    attributes {
                        locale
                        slug
                    }
                }
            }
        }
    }
`;
