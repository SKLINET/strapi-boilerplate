import { graphql } from 'relay-runtime';

export const ArticleDetailQuery = graphql`
    query articleDetailQuery($slug: String, $publicationState: String) {
        findSlug(modelName: "article", slug: $slug, publicationState: $publicationState) {
            ... on ArticleEntityResponse {
                ...articleDetailFragment @relay(mask: false)
            }
        }
    }
`;

export const ArticlePreviewQuery = graphql`
    query articlePreviewQuery($id: ID, $locale: I18NLocaleCode) {
        item: article(id: $id, locale: $locale) {
            ...articleDetailFragment @relay(mask: false)
        }
    }
`;

export const ArticleListQuery = graphql`
    query articleListQuery(
        $start: Int
        $limit: Int
        $filters: ArticleFiltersInput
        $publicationState: PublicationState
        $locale: I18NLocaleCode
    ) {
        articles(
            pagination: { start: $start, limit: $limit }
            publicationState: $publicationState
            filters: $filters
            locale: $locale
        ) {
            meta {
                pagination {
                    total
                }
            }
            data {
                attributes {
                    title
                    mainImage {
                        ...appImageFragment @relay(mask: false)
                    }
                    publishDate
                    perex
                    slug
                }
            }
        }
    }
`;

graphql`
    fragment articleDetailFragment on ArticleEntityResponse {
        data {
            id
            attributes {
                title
                slug
                publishDate
                content
                perex
                publishedAt
                author
                mainImage {
                    ...appImageFragment @relay(mask: false)
                }
                seo {
                    ...appSeoFragment @relay(mask: false)
                }
                sitemap {
                    ...appSitemapFragment @relay(mask: false)
                }
            }
        }
    }
`;
