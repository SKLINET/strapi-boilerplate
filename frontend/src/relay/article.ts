import { graphql } from 'relay-runtime';

/* TODO: Slugify must be reworked on Strapi 5 */
/*
export const ArticleDetailQuery = graphql`
    query articleDetailQuery($slug: String, $id: String, $locale: String, $publicationStatus: String) {
        item: findSlug(modelName: "article", slug: $slug, id: $id, locale: $locale, status: $publicationStatus) {
            ... on ArticleEntityResponse {
                ...articleDetailFragment @relay(mask: false)
            }
        }
    }
`;
*/

export const ArticleDetailQuery = graphql`
    query articleDetailQuery($publicationStatus: PublicationStatus, $locale: I18NLocaleCode, $documentId: ID!) {
        item: article(documentId: $documentId, status: $publicationStatus, locale: $locale) {
            ...articleDetailFragment @relay(mask: false)
        }
    }
`;

export const ArticleListQuery = graphql`
    query articleListQuery(
        $locale: I18NLocaleCode
        $start: Int
        $limit: Int
        $filter: ArticleFiltersInput
        $publicationStatus: PublicationStatus
        $sort: [String] = ["publishDate:desc", "publishedAt:desc"]
    ) {
        items: articles(
            locale: $locale
            pagination: { start: $start, limit: $limit }
            sort: $sort
            filters: $filter
            status: $publicationStatus
        ) {
            ...articleFragment @relay(mask: false)
        }
    }
`;

export const ArticleStaticPathsQuery = graphql`
    query articleStaticPathsQuery($locale: I18NLocaleCode, $start: Int, $limit: Int, $filters: ArticleFiltersInput) {
        articles(locale: $locale, pagination: { start: $start, limit: $limit }, filters: $filters) {
            ...articleDetailFragment @relay(mask: false)
        }
    }
`;

graphql`
    fragment articleFragment on Article {
        documentId
        title
        slug
        publishedAt
        publishDate
        category {
            ...articleCategoryFragment @relay(mask: false)
        }
        image {
            ...appImageFragment @relay(mask: false)
        }
        content
    }
`;

graphql`
    fragment articleDetailFragment on Article {
        __typename
        documentId
        title
        slug
        publishedAt
        publishDate
        category {
            ...articleCategoryFragment @relay(mask: false)
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
            documentId
            locale
            slug
        }
    }
`;
