import { graphql } from 'relay-runtime';

graphql`
    fragment webSettingFragment on WebSetting {
        documentId
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
            ...appMenuFragment @relay(mask: false)
        }
        globalSeo {
            siteName
            titleSuffix
            description
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
`;

export const webSettingQuery = graphql`
    query webSettingQuery($publicationStatus: PublicationStatus, $locale: I18NLocaleCode) {
        item: webSetting(status: $publicationStatus, locale: $locale) {
            ...webSettingFragment @relay(mask: false)
        }
    }
`;
