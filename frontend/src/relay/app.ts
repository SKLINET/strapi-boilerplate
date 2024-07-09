import { graphql } from 'relay-runtime';

export const AppQuery = graphql`
    query appQuery(
        $pattern: String
        $redirect: String
        $publicationState: PublicationState
        $locale: I18NLocaleCode
        $entityId: Int
    ) {
        page(locale: $locale, pattern: $pattern, publicationState: $publicationState, entityId: $entityId) {
            id
            attributes {
                title
                url
                publishedAt
                pages {
                    data {
                        ...appPageFragment @relay(mask: false)
                    }
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

        webSetting(publicationState: $publicationState, locale: $locale) {
            data {
                ...webSettingFragment @relay(mask: false)
            }
        }

        systemResources(publicationState: $publicationState, locale: $locale) {
            data {
                ...appSystemResourceFragment @relay(mask: false)
            }
        }

        redirect: findRedirect(redirectFrom: $redirect, publicationState: $publicationState) {
            redirectFrom
            to: redirectTo
            statusCode
        }

        contactForm(publicationState: $publicationState, locale: $locale) {
            data {
                ...contactFormFragment @relay(mask: false)
            }
        }
    }
`;

graphql`
    fragment appPageFragment on PageEntity {
        id
        attributes {
            title
            url
        }
    }
`;

graphql`
    fragment appImageFragment on UploadFileEntity {
        id
        attributes {
            url
            alternativeText
            width
            height
        }
    }
`;

graphql`
    fragment appVideoFragment on ComponentComplementaryVideo {
        id
        uploadedVideo {
            data {
                ...appUploadedVideoFragment @relay(mask: false)
            }
        }
        externalVideo
        optionalImage {
            data {
                ...appImageFragment @relay(mask: false)
            }
        }
    }
`;

graphql`
    fragment appUploadedVideoFragment on UploadFileEntity {
        id
        attributes {
            url
        }
    }
`;

graphql`
    fragment appIconFragment on IconEntity {
        id
        attributes {
            title
            codename
        }
    }
`;

graphql`
    fragment appButtonFragment on ComponentComplementaryButton {
        id
        label
        page {
            data {
                ...appPageFragment @relay(mask: false)
            }
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
            data {
                ...appPageFragment @relay(mask: false)
            }
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
        socialNetworks {
            ...appSocialNetworksFragment @relay(mask: false)
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
    fragment appSocialNetworksFragment on ComponentSharedSocialNetworks {
        id
        facebookMeta {
            ...appMetaSocialFragment @relay(mask: false)
        }
        twitterMeta {
            ...appMetaSocialFragment @relay(mask: false)
        }
    }
`;

graphql`
    fragment appMetaSocialFragment on ComponentSharedMetaSocial {
        id
        title
        description
        image {
            data {
                ...appImageFragment @relay(mask: false)
            }
        }
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
    fragment appSystemResourceFragment on SystemResourceEntity {
        id
        attributes {
            codename
            value
        }
    }
`;

graphql`
    fragment appSendEmailFragment on ComponentComplementarySendEmail {
        id
        emailFrom
        emailTo
        subject
    }
`;
