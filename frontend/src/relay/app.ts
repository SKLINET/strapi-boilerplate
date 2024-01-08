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
            ...appSystemResourceFragment @relay(mask: false)
        }

        page(locale: $locale, pattern: $pattern, publicationState: $publicationState, entityId: $entityId) {
            id
            attributes {
                title
                url
                publishedAt
                pages {
                    ...appPagesFragment @relay(mask: false)
                }
                parent {
                    data {
                        id
                        attributes {
                            title
                            url
                            seo {
                                ...appSeoFragment @relay(mask: false)
                            }
                            parent {
                                data {
                                    id
                                    attributes {
                                        title
                                        url
                                        seo {
                                            ...appSeoFragment @relay(mask: false)
                                        }
                                        parent {
                                            data {
                                                id
                                                attributes {
                                                    title
                                                    url
                                                    seo {
                                                        ...appSeoFragment @relay(mask: false)
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                seo {
                    ...appSeoFragment @relay(mask: false)
                }
                sitemap {
                    ...appSitemapFragment @relay(mask: false)
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

        redirect: findRedirect(redirectFrom: $redirect, publicationState: $publicationState) {
            redirectFrom
            to: redirectTo
            statusCode
        }

        webSetting(publicationState: $publicationState, locale: $locale) {
            ...webSettingFragment @relay(mask: false)
        }

        contactForm(publicationState: $publicationState, locale: $locale) {
            ...contactFormFragment @relay(mask: false)
        }
    }
`;

graphql`
    fragment appPagesFragment on PageRelationResponseCollection {
        data {
            id
            attributes {
                url
            }
        }
    }
`;

graphql`
    fragment appPageFragment on PageEntityResponse {
        data {
            id
            attributes {
                url
            }
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
    fragment appVideoFragment on ComponentComplementaryVideo {
        id
        uploadedVideo {
            ...appUploadedVideoFragment @relay(mask: false)
        }
        externalVideo
        optionalImage {
            ...appImageFragment @relay(mask: false)
        }
    }
`;

graphql`
    fragment appUploadedVideoFragment on UploadFileEntityResponse {
        data {
            attributes {
                url
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
        id
        label
        page {
            ...appPageFragment @relay(mask: false)
        }
        linkExternal
        openInNewTab
    }
`;

graphql`
    fragment appMenuEntityFragment on MenuEntity {
        id
        attributes {
            title
            items {
                ...appMenuItemFragment @relay(mask: false)
            }
        }
    }
`;

graphql`
    fragment appMenuItemFragment on ComponentMenuMenuItem {
        id
        label
        page {
            ...appPageFragment @relay(mask: false)
        }
        externalUrl
        openInNewTab
    }
`;

graphql`
    fragment appSeoFragment on ComponentSharedSeo {
        title
        metaTitle
        metaDescription
        metaSocial {
            socialNetwork
            title
            description
            image {
                ...appImageFragment @relay(mask: false)
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
`;

graphql`
    fragment appSitemapFragment on ComponentSharedSitemap {
        enabled
        changeFrequency
        priority
    }
`;

graphql`
    fragment appSystemResourceFragment on SystemResourceEntityResponseCollection {
        data {
            attributes {
                codename
                value
            }
        }
    }
`;

graphql`
    fragment appTemplateFragment on TemplateEntityResponse {
        data {
            attributes {
                content {
                    __typename
                    ...VideoBlock_content @relay(mask: false)
                }
            }
        }
    }
`;
