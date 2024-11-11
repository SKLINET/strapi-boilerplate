import { graphql } from 'relay-runtime';

export const PreviewSettingsQuery = graphql`
    query previewSettingsQuery($locale: I18NLocaleCode, $status: PublicationStatus) {
        webSetting(status: $status, locale: $locale) {
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
    query previewPageQuery($pattern: String, $locale: I18NLocaleCode, $status: PublicationStatus) {
        findPage(pattern: $pattern, locale: $locale, status: $status) {
            url
        }
    }
`;
