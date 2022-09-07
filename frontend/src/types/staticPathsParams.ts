import { ENUM_COMPONENTSHAREDSITEMAP_CHANGEFREQUENCY } from '../relay/__generated__/pageStaticPathsQuery.graphql';

export interface StaticPathsParams {
    params: {
        slug: string[];
        locale?: string;
        sitemap: {
            enabled: boolean;
            changeFrequency: ENUM_COMPONENTSHAREDSITEMAP_CHANGEFREQUENCY | string;
            priority: number;
        };
    };
    locale?: string;
}
