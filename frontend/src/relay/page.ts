import { graphql } from 'relay-runtime';

export const pageDetailQuery = graphql`
    query pageDetailQuery($locale: I18NLocaleCode) {
        item: page(locale: $locale) {
            documentId
            title
            url
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
                ...blocksContent @relay(mask: false)
            }
        }
    }
`;

export const pageStaticPathsQuery = graphql`
    query pageStaticPathsQuery($locale: I18NLocaleCode, $start: Int, $limit: Int) {
        pages(locale: $locale, pagination: { start: $start, limit: $limit }) {
            documentId
            url
            publishedAt
            content: blocks {
                ...blocksContent @relay(mask: false)
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
                ...blocksContent @relay(mask: false)
            }
        }
    }
`;

export const SitemapPagesQuery = graphql`
    query pagesSitemapQuery($publicationStatus: PublicationStatus) {
        pages(status: $publicationStatus) {
            documentId
            url
            publishedAt
            sitemap {
                ...appSitemapFragment @relay(mask: false)
            }
        }
    }
`;

export const SitemapArticlesQuery = graphql`
    query pageArticlesSitemapQuery($publicationStatus: PublicationStatus, $filters: ArticleFiltersInput) {
        articles(status: $publicationStatus, filters: $filters) {
            documentId
            slug
            publishedAt
            sitemap {
                ...appSitemapFragment @relay(mask: false)
            }
        }
    }
`;
export const PageIdQuery = graphql`
    query pageIdQuery($publicationStatus: PublicationStatus, $filters: PageFiltersInput, $locale: I18NLocaleCode) {
        pages(status: $publicationStatus, filters: $filters, locale: $locale) {
            documentId
        }
    }
`;
