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
                            data {
                                attributes {
                                    url
                                    width
                                    height
                                    alternativeText
                                }
                            }
                        }
                        publishDate
                        content
                        author
                        seo {
                            title
                            metaTitle
                            metaDescription
                            metaSocial {
                                socialNetwork
                                title
                                description
                                image {
                                    data {
                                        attributes {
                                            url
                                            width
                                            height
                                            alternativeText
                                        }
                                    }
                                }
                            }
                            keywords
                            metaRobots
                            structuredData
                            metaViewport
                            canonicalURL
                            meta {
                                name
                                content
                            }
                            preventIndexing
                        }
                        sitemap {
                            enabled
                            changeFrequency
                            priority
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
                        data {
                            attributes {
                                url
                                width
                                height
                                alternativeText
                            }
                        }
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
                        data {
                            attributes {
                                url
                                width
                                height
                                alternativeText
                            }
                        }
                    }
                    sitemap {
                        enabled
                        changeFrequency
                        priority
                    }
                }
            }
        }
    }
`;
