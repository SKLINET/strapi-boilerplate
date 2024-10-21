import { graphql } from 'relay-runtime';

export const AppQuery = graphql`
    query appQuery(
        $pattern: String
        $redirect: String
        $status: PublicationStatus
        $locale: I18NLocaleCode
        $entityId: Int
    ) {
        page(locale: $locale, pattern: $pattern, status: $status, entityId: $entityId) {
            documentId
            title
            url
            updatedAt
            publishedAt
            pages {
                ...appPageFragment @relay(mask: false)
            }
            parent {
                documentId
                title
                url
                seo {
                    ...appSeoFragment @relay(mask: false)
                }
                parent {
                    documentId
                    title
                    url
                    seo {
                        ...appSeoFragment @relay(mask: false)
                    }
                    parent {
                        documentId
                        title
                        url
                        seo {
                            ...appSeoFragment @relay(mask: false)
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
                documentId
                title
                url
                publishedAt
                locale
            }
            content: blocks {
                __typename
                ...blocksContent @relay(mask: false)
            }
        }

        webSetting(status: $status, locale: $locale) {
            ...webSettingFragment @relay(mask: false)
        }

        systemResources(status: $status, locale: $locale) {
            ...appSystemResourceFragment @relay(mask: false)
        }

        redirect: findRedirect(redirectFrom: $redirect, status: $status) {
            redirectFrom
            to: redirectTo
            statusCode
            updatedAt
            publishedAt
        }

        contactForm(status: $status, locale: $locale) {
            ...contactFormFragment @relay(mask: false)
        }
    }
`;

graphql`
    fragment appPageFragment on Page {
        documentId
        title
        url
    }
`;

graphql`
    fragment appImageFragment on UploadFile {
        documentId
        url
        alternativeText
        width
        height
    }
`;

graphql`
    fragment appFileFragment on UploadFile {
        documentId
        name
        url
        size
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
    fragment appUploadedVideoFragment on UploadFile {
        documentId
        url
    }
`;

graphql`
    fragment appIconFragment on Icon {
        documentId
        title
        codename
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
    fragment appMenuFragment on Menu {
        documentId
        title
        items {
            ...appMenuItemFragment @relay(mask: false)
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
            ...appImageFragment @relay(mask: false)
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
    fragment appSystemResourceFragment on SystemResource {
        documentId
        codename
        value
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
