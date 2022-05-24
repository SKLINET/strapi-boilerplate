import { graphql } from 'relay-runtime';

export const SitemapPagesQuery = graphql`
    query pagesSitemapQuery($publicationState: PublicationState) {
        pages(publicationState: $publicationState) {
            data {
                attributes {
                    url
                    sitemap {
                        enabled
                        changeFrequency
                        priority
                    }
                }
            }
        }
    }
`;

export const SitemapArticlesQuery = graphql`
    query pageArticlesSitemapQuery($publicationState: PublicationState, $filters: ArticleFiltersInput) {
        articles(publicationState: $publicationState, filters: $filters) {
            data {
                attributes {
                    slug
                    sitemap {
                        enabled
                        changeFrequency
                        priority
                    }
                }
            }
        }
    }
`;
