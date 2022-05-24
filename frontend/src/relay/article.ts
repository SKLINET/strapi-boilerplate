import { graphql } from 'relay-runtime';

export const ArticleDetailQuery = graphql`
    query articleDetailQuery($slug: String, $publicationState: String) {
        findSlug(modelName: "article", slug: $slug, publicationState: $publicationState) {
            ... on ArticleEntityResponse {
                data {
                    attributes {
                        title
                        slug
                        publishDate
                        content
                        perex
                        author
                        mainImage {
                            data {
                                attributes {
                                    url
                                    alternativeText
                                    width
                                    height
                                }
                            }
                        }
                        seo {
                            metaTitle
                            metaDescription
                            metaImage {
                                data {
                                    attributes {
                                        url
                                        alternativeText
                                        width
                                        height
                                    }
                                }
                            }
                            metaSocial {
                                socialNetwork
                                title
                                description
                                image {
                                    data {
                                        attributes {
                                            url
                                            alternativeText
                                            width
                                            height
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
                    perex
                    slug
                }
            }
        }
    }
`;
