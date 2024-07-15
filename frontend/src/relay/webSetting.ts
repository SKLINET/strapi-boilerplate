import { graphql } from 'relay-runtime';

graphql`
    fragment webSettingFragment on WebSettingEntity {
        id
        attributes {
            gtmCode
            homePage {
                data {
                    ...appPageFragment @relay(mask: false)
                }
            }
            articlesPage {
                data {
                    ...appPageFragment @relay(mask: false)
                }
            }
            articleDetailPage {
                data {
                    ...appPageFragment @relay(mask: false)
                }
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
                sharingImage {
                    data {
                        ...appImageFragment @relay(mask: false)
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
`;

export const webSettingQuery = graphql`
    query webSettingQuery($publicationState: PublicationState, $locale: I18NLocaleCode) {
        item: webSetting(publicationState: $publicationState, locale: $locale) {
            data {
                ...webSettingFragment @relay(mask: false)
            }
        }
    }
`;
