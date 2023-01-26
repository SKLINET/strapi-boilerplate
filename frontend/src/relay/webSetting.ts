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
                seo {
                    ...appSeoFragment @relay(mask: false)
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
