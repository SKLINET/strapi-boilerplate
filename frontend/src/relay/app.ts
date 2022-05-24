import { graphql } from 'relay-runtime';

export const AppQuery = graphql`
    query appQuery($pattern: String, $redirect: String, $publicationState: PublicationState, $locale: I18NLocaleCode) {
        systemResources(publicationState: $publicationState, locale: $locale) {
            data {
                attributes {
                    codename
                    value
                }
            }
        }

        findPage(pattern: $pattern, publicationState: $publicationState, locale: $locale) {
            title
            locale
            url
            blocks {
                __typename
                ...blocksContent @relay(mask: false)
            }
        }

        findRedirect(redirectFrom: $redirect, publicationState: $publicationState) {
            redirectFrom
            redirectTo
            statusCode
        }

        webSetting(publicationState: $publicationState) {
            data {
                attributes {
                    gtmCode
                    facebook
                    twitter
                    instagram
                    pinterest
                    youtube
                    mailTo
                    mailFrom
                    mailSubject
                    homePage {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                    articlesPage {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                    articleDetailPage {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                    mainMenu {
                        data {
                            attributes {
                                items {
                                    title
                                    page {
                                        data {
                                            attributes {
                                                url
                                            }
                                        }
                                    }
                                    externalUrl
                                    target
                                    showMegaMenu
                                }
                            }
                        }
                    }
                    globalSeo {
                        siteName
                        titleSuffix
                        facebookPageUrl
                        fallbackSeo {
                            description
                            title
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
                            twitterCard
                        }
                        twitterAccount
                        favicon {
                            data {
                                attributes {
                                    url
                                    width
                                    height
                                    alternativeText
                                }
                            }
                        }
                        faviconMetaTags {
                            tag
                            attributes
                            content
                        }
                    }
                }
            }
        }
    }
`;
