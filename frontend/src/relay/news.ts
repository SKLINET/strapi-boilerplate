import { graphql } from 'relay-runtime';

export const newsDetailQuery = graphql`
    query newsDetailQuery($locale: I18NLocaleCode, $filters: ArticleFiltersInput) {
        item: articles(locale: $locale, filters: $filters) {
            meta {
                pagination {
                    total
                }
            }
            data {
                id
                attributes {
                    title
                    slug
                }
            }
        }
    }
`;

export const newsListQuery = graphql`
    query newsListQuery($locale: I18NLocaleCode, $start: Int, $limit: Int) {
        items: articles(locale: $locale, pagination: { start: $start, limit: $limit }) {
            meta {
                pagination {
                    total
                }
            }
            data {
                id
                attributes {
                    title
                    slug
                }
            }
        }
    }
`;

export const newsStaticPathsQuery = graphql`
    query newsStaticPathsQuery($locale: I18NLocaleCode, $start: Int, $limit: Int, $filters: ArticleFiltersInput) {
        articles(locale: $locale, pagination: { start: $start, limit: $limit }, filters: $filters) {
            meta {
                pagination {
                    total
                }
            }
            data {
                id
                attributes {
                    title
                    slug
                }
            }
        }
    }
`;
