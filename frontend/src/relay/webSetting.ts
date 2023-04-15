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
                    ...appPageFragment @relay(mask: false)
                }
                articlesPage {
                    ...appPageFragment @relay(mask: false)
                }
                articleDetailPage {
                    ...appPageFragment @relay(mask: false)
                }
                mainMenu {
                    ...appMenuFragment @relay(mask: false)
                }
                footerMenu {
                    ...appMenuFragment @relay(mask: false)
                }
                globalSeo {
                    siteName
                    titleSuffix
                    description
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
                    sharingImage {
                        data {
                            attributes {
                                url
                                width
                                height
                                alternativeText
                            }
                        }
                    }
                    preventIndexing
                    metaTags {
                        name
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
