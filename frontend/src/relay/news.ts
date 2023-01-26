import { graphql } from 'relay-runtime';

export const newsDetailQuery = graphql`
    query newsDetailQuery($locale: String, $slug: String, $publicationState: String) {
        item: findSlug(modelName: "article", slug: $slug, locale: $locale, publicationState: $publicationState) {
            ... on ArticleEntityResponse {
                data {
                    id
                    attributes {
                        title
                        url: slug
                        date: publishDate
                        publishedAt
                        perex
                        image: mainImage {
                            ...appImageFragment @relay(mask: false)
                        }
                        publishDate
                        content
                        author
                        seo {
                            ...appSeoFragment @relay(mask: false)
                        }
                        sitemap {
                            ...appSitemapFragment @relay(mask: false)
                        }
                    }
                }
            }
        }
    }
`;

export const newsListQuery = graphql`
    query newsListQuery(
        $locale: I18NLocaleCode
        $start: Int
        $limit: Int
        $publicationState: PublicationState
        $filters: ArticleFiltersInput
    ) {
        items: articles(
            locale: $locale
            pagination: { start: $start, limit: $limit }
            sort: "publishDate:desc"
            publicationState: $publicationState
            filters: $filters
        ) {
            meta {
                pagination {
                    total
                }
            }
            data {
                id
                attributes {
                    title
                    url: slug
                    date: publishDate
                    image: mainImage {
                        ...appImageFragment @relay(mask: false)
                    }
                }
            }
        }
    }
`;

export const newsStaticPathsQuery = graphql`
    query newsStaticPathsQuery($locale: I18NLocaleCode, $start: Int, $limit: Int, $filters: ArticleFiltersInput) {
        articles(locale: $locale, pagination: { start: $start, limit: $limit }, filters: $filters) {
            meta {
                pagination {
                    total
                }
            }
            data {
                id
                attributes {
                    title
                    url: slug
                    slug
                    date: publishDate
                    image: mainImage {
                        ...appImageFragment @relay(mask: false)
                    }
                    sitemap {
                        ...appSitemapFragment @relay(mask: false)
                    }
                }
            }
        }
    }
`;
