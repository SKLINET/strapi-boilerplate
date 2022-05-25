import { graphql } from 'relay-runtime';

graphql`
    fragment pageFragment on PageEntityResponse {
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
                meta {
                    metaTitle
                    metaDescription
                    metaImage {
                        data {
                            attributes {
                                url
                                width
                                height
                                alternativeText
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
                blocks {
                    ...blocksContent @relay(mask: false)
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

export const pageDetailQuery = graphql`
    query pageDetailQuery($locale: I18NLocaleCode) {
        item: page(locale: $locale) {
            ...pageFragment @relay(mask: false)
        }
    }
`;
