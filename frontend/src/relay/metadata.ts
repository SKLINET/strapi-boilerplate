import { graphql } from 'relay-runtime';

// For global SEO
export const MetadataGlobalQuery = graphql`
    query metadataGlobalQuery($status: PublicationStatus, $locale: I18NLocaleCode) {
        webSetting(status: $status, locale: $locale) {
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
    }
`;

// For page SEO
// Note: content must includes all detail blocks -> return item object
export const MetadataPageQuery = graphql`
    query metadataPageQuery($pattern: String, $status: PublicationStatus, $locale: I18NLocaleCode) {
        page(locale: $locale, pattern: $pattern, status: $status) {
            documentId
            title
            seo {
                ...appSeoFragment @relay(mask: false)
            }
            content: blocks {
                __typename
                ...ArticleDetailBlock_content @relay(mask: false)
            }
        }
    }
`;
