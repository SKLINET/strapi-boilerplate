import { graphql } from 'relay-runtime';

export const newsDetailQuery = graphql`
    query newsDetailQuery($locale: String, $slug: String, $publicationState: String) {
        item: findSlug(modelName: "article", slug: $slug, locale: $locale, publicationState: $publicationState) {
            ... on ArticleEntityResponse {
                ...newsDetailFragment @relay(mask: false)
            }
        }
    }
`;

export const newsPreviewQuery = graphql`
    query newsPreviewQuery($id: ID, $locale: I18NLocaleCode) {
        item: article(id: $id, locale: $locale) {
            ...newsDetailFragment @relay(mask: false)
        }
    }
`;

export const newsListQuery = graphql`
    query newsListQuery($locale: I18NLocaleCode, $start: Int, $limit: Int, $filter: ArticleFiltersInput) {
        items: articles(
            locale: $locale
            pagination: { start: $start, limit: $limit }
            sort: "publishDate:desc"
            filters: $filter
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

graphql`
    fragment newsDetailFragment on ArticleEntityResponse {
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
                localizations {
                    data {
                        id
                        attributes {
                            locale
                            slug
                        }
                    }
                }
                perex
                content
                seo {
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
                    preventIndexing
                    meta {
                        name
                        content
                    }
                    title
                }
                sitemap {
                    enabled
                    changeFrequency
                    priority
                }
            }
        }
    }
`;
