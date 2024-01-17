import { graphql } from 'relay-runtime';

graphql`
    fragment webSettingFragment on WebSettingEntityResponse {
        data {
            attributes {
                gtmCode
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
                    data {
                        ...appMenuEntityFragment @relay(mask: false)
                    }
                }
                globalSeo {
                    siteName
                    titleSuffix
                    description
                    favicon {
                        ...appImageFragment @relay(mask: false)
                    }
                    sharingImage {
                        ...appImageFragment @relay(mask: false)
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
