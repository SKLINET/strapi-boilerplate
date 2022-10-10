import { graphql } from 'relay-runtime';

export const pageDetailQuery = graphql`
    query pageDetailQuery($locale: I18NLocaleCode) {
        item: page(locale: $locale) {
            title
            url
            publishedAt
            pages {
                data {
                    attributes {
                        url
                    }
                }
            }
            parent {
                data {
                    attributes {
                        url
                    }
                }
            }
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
            content: blocks {
                ...blocksContent @relay(mask: false)
            }
        }
    }
`;

export const pageStaticPathsQuery = graphql`
    query pageStaticPathsQuery($locale: I18NLocaleCode, $start: Int, $limit: Int) {
        pages(locale: $locale, pagination: { start: $start, limit: $limit }) {
            meta {
                pagination {
                    total
                }
            }
            data {
                id
                attributes {
                    url
                    content: blocks {
                        ...blocksContent @relay(mask: false)
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

export const pageListQuery = graphql`
    query pageListQuery($locale: I18NLocaleCode, $start: Int, $limit: Int) {
        meta: pages(locale: $locale) {
            meta {
                pagination {
                    total
                }
            }
        }
        pages(locale: $locale, pagination: { start: $start, limit: $limit }) {
            data {
                id
                attributes {
                    title
                    url
                    pages {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                    parent {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
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
                    content: blocks {
                        ...blocksContent @relay(mask: false)
                    }
                }
            }
        }
    }
`;

export const SitemapPagesQuery = graphql`
    query pagesSitemapQuery($publicationState: PublicationState) {
        pages(publicationState: $publicationState) {
            data {
                attributes {
                    url
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

export const SitemapArticlesQuery = graphql`
    query pageArticlesSitemapQuery($publicationState: PublicationState, $filters: ArticleFiltersInput) {
        articles(publicationState: $publicationState, filters: $filters) {
            data {
                attributes {
                    slug
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
export const PageIdQuery = graphql`
    query pageIdQuery($publicationState: PublicationState, $filters: PageFiltersInput, $locale: I18NLocaleCode) {
        pages(publicationState: $publicationState, filters: $filters, locale: $locale) {
            data {
                id
            }
        }
    }
`;
