import { graphql } from 'relay-runtime';

export const PreviewSettingsQuery = graphql`
    query previewSettingsQuery($locale: I18NLocaleCode, $publicationStatus: PublicationStatus) {
        webSetting(status: $publicationStatus, locale: $locale) {
            homePage {
                ...appPageFragment @relay(mask: false)
            }
            articleDetailPage {
                ...appPageFragment @relay(mask: false)
            }
        }
    }
`;

export const PreviewPageQuery = graphql`
    query previewPageQuery($pattern: String, $locale: I18NLocaleCode, $publicationStatus: PublicationStatus) {
        findPage(pattern: $pattern, locale: $locale, status: $publicationStatus) {
            url
        }
    }
`;
