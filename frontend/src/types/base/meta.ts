export interface Meta {
    title?: string;
    metaTitle?: string;
    metaDescription?: string;
    meta?: {
        name: string;
        content: string;
    }[];
    image?: {
        media: {
            url: string;
        };
        alt: string;
    };
    preventIndexing: boolean;
}
