import graphql from 'graphql-tag';

graphql`
    fragment webSettingFragment on WebSettingEntityResponse {
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
`;

export const webSettingQuery = graphql`
    query webSettingQuery($publicationState: PublicationState, $locale: I18NLocaleCode) {
        item: webSetting(publicationState: $publicationState, locale: $locale) {
            ...webSettingFragment @relay(mask: false)
        }
    }
`;
