import { graphql } from 'relay-runtime';

export const ArticleDetailQuery = graphql`
    query articleDetailQuery($locale: String, $slug: String, $publicationState: String) {
        item: findSlug(modelName: "article", slug: $slug, locale: $locale, publicationState: $publicationState) {
            ... on ArticleEntityResponse {
                data {
                    ...articleDetailFragment @relay(mask: false)
                }
            }
        }
    }
`;

export const ArticlePreviewQuery = graphql`
    query articlePreviewQuery($id: ID, $locale: I18NLocaleCode) {
        item: article(id: $id, locale: $locale) {
            data {
                ...articleDetailFragment @relay(mask: false)
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
    ) {
        items: articles(
            locale: $locale
            pagination: { start: $start, limit: $limit }
            sort: "publishedAt:desc"
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
            image {
                ...appImageFragment @relay(mask: false)
            }
            perex
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
            image {
                ...appImageFragment @relay(mask: false)
            }
            perex
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
