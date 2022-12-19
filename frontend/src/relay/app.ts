import { graphql } from 'relay-runtime';

export const AppQuery = graphql`
    query appQuery(
        $pattern: String
        $redirect: String
        $publicationState: PublicationState
        $locale: I18NLocaleCode
        $entityId: Int
    ) {
        systemResources(publicationState: $publicationState, locale: $locale) {
            data {
                attributes {
                    codename
                    value
                }
            }
        }

        page(locale: $locale, pattern: $pattern, publicationState: $publicationState, entityId: $entityId) {
            id
            attributes {
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
                localizations {
                    data {
                        id
                        attributes {
                            url
                            locale
                        }
                    }
                }
                content: blocks {
                    __typename
                    ...blocksContent @relay(mask: false)
                }
            }
        }

        findRedirect(redirectFrom: $redirect, publicationState: $publicationState) {
            redirectFrom
            redirectTo
            statusCode
        }

        webSetting(publicationState: $publicationState) {
            ...webSettingFragment @relay(mask: false)
        }
    }
`;

graphql`
    fragment appImageFragment on UploadFileEntityResponse {
        data {
            attributes {
                url
                alternativeText
                width
                height
            }
        }
    }
`;
graphql`
    fragment appIconFragment on IconEntityResponse {
        data {
            attributes {
                title
                codename
            }
        }
    }
`;

graphql`
    fragment appButtonFragment on ComponentComplementaryButton {
        text
        page {
            data {
                attributes {
                    url
                }
            }
        }
        linkExternal
    }
`;
