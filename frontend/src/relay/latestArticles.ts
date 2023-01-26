import { graphql } from 'relay-runtime';

export const LatestArticlesQuery = graphql`
    query latestArticlesQuery(
        $filters: ArticleFiltersInput
        $publicationState: PublicationState
        $locale: I18NLocaleCode
        $start: Int
        $limit: Int
    ) {
        articles(
            filters: $filters
            publicationState: $publicationState
            locale: $locale
            pagination: { start: $start, limit: $limit }
            sort: "publishDate:desc"
        ) {
            data {
                attributes {
                    title
                    mainImage {
                        ...appImageFragment @relay(mask: false)
                    }
                    publishDate
                    perex
                    slug
                }
            }
        }
    }
`;
