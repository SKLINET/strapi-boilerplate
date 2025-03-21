import { graphql } from 'relay-runtime';

export const pageDetailQuery = graphql`
    query pageDetailQuery($locale: I18NLocaleCode) {
        item: page(locale: $locale) {
            documentId
            title
            url
            updatedAt
            publishedAt
            pages {
                ...appPageFragment @relay(mask: false)
            }
            parent {
                ...appPageFragment @relay(mask: false)
            }
            seo {
                ...appSeoFragment @relay(mask: false)
            }

            sitemap {
                ...appSitemapFragment @relay(mask: false)
            }
            content: blocks {
                ...serverBlocksContent @relay(mask: false)
            }
        }
    }
`;

export const pageStaticPathsQuery = graphql`
    query pageStaticPathsQuery($locale: I18NLocaleCode, $start: Int, $limit: Int) {
        pages(locale: $locale, pagination: { start: $start, limit: $limit }) {
            documentId
            url
            updatedAt
            publishedAt
            content: blocks {
                ...serverBlocksContent @relay(mask: false)
            }
            sitemap {
                ...appSitemapFragment @relay(mask: false)
            }
        }
    }
`;

export const pageListQuery = graphql`
    query pageListQuery($locale: I18NLocaleCode, $start: Int, $limit: Int) {
        pages(locale: $locale, pagination: { start: $start, limit: $limit }) {
            documentId
            title
            url
            updatedAt
            publishedAt
            pages {
                ...appPageFragment @relay(mask: false)
            }
            parent {
                ...appPageFragment @relay(mask: false)
            }
            seo {
                ...appSeoFragment @relay(mask: false)
            }
            sitemap {
                ...appSitemapFragment @relay(mask: false)
            }
            content: blocks {
                ...serverBlocksContent @relay(mask: false)
            }
        }
    }
`;

export const SitemapPagesQuery = graphql`
    query pagesSitemapQuery($status: PublicationStatus) {
        pages(status: $status) {
            documentId
            url
            updatedAt
            publishedAt
            sitemap {
                ...appSitemapFragment @relay(mask: false)
            }
        }
    }
`;

export const SitemapArticlesQuery = graphql`
    query pageArticlesSitemapQuery($status: PublicationStatus, $filters: ArticleFiltersInput) {
        articles(status: $status, filters: $filters) {
            documentId
            slug
            updatedAt
            publishedAt
            sitemap {
                ...appSitemapFragment @relay(mask: false)
            }
        }
    }
`;
export const PageIdQuery = graphql`
    query pageIdQuery($status: PublicationStatus, $filters: PageFiltersInput, $locale: I18NLocaleCode) {
        pages(status: $status, filters: $filters, locale: $locale) {
            documentId
        }
    }
`;
