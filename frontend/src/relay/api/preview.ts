import { graphql } from 'relay-runtime';

export const PreviewSettingsQuery = graphql`
    query previewSettingsQuery($locale: I18NLocaleCode, $publicationState: PublicationState) {
        webSetting(publicationState: $publicationState, locale: $locale) {
            data {
                attributes {
                    homePage {
                        ...appPageFragment @relay(mask: false)
                    }
                    articleDetailPage {
                        ...appPageFragment @relay(mask: false)
                    }
                }
            }
        }
    }
`;

export const PreviewPageQuery = graphql`
    query previewPageQuery($pattern: String, $locale: I18NLocaleCode, $publicationState: PublicationState) {
        findPage(pattern: $pattern, locale: $locale, publicationState: $publicationState) {
            url
        }
    }
`;
