export interface MetaItem {
    title: string;
    seo: {
        metaTitle: string;
        metaDescription: string;
        metaSocial: {
            socialNetwork: string;
            title: string;
            description: string;
            image: {
                data: {
                    attributes: {
                        url: string;
                        width: number;
                        height: number;
                        alternativeText: string;
                    };
                };
            };
        }[];
        keywords: string;
        metaRobots: string;
        structuredData: JSON;
        metaViewport: string;
        canonicalURL: string;
        meta: { name: string; content: string }[];
        preventIndexing: boolean;
    };
}
export interface MetaItems {
    item: MetaItem;
}
