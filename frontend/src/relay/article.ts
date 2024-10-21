import { graphql } from 'relay-runtime';

export const ArticleDetailQuery = graphql`
    query articleDetailQuery($slug: String, $locale: I18NLocaleCode, $status: PublicationStatus) {
        item: findArticleBySlug(slug: $slug, locale: $locale, status: $status) {
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
        $status: PublicationStatus
        $sort: [String] = ["publishDate:desc", "publishedAt:desc"]
    ) {
        items: articles(
            locale: $locale
            pagination: { start: $start, limit: $limit }
            sort: $sort
            filters: $filter
            status: $status
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
        updatedAt
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
        updatedAt
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
            title
            slug
            publishedAt
            locale
        }
    }
`;
