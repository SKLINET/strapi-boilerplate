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
                        id
                        attributes {
                            url
                        }
                    }
                }
                articlesPage {
                    data {
                        id
                        attributes {
                            url
                        }
                    }
                }
                articleDetailPage {
                    data {
                        id
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
                footerMenu {
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
