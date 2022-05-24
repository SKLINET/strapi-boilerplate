import { Media } from './media';
import { Meta } from './meta';

export interface Article {
    title: string;
    perex?: string;
    slug?: string;
    meta: Meta;
    introText?: string;
    mainImage: Media;
    label?: string;
    heading?: string;
    author?: {
        firstName: string;
        lastName: string;
    };
    publishDate: Date;
    content?: string;
}

export interface ReadOnlyArticle {
    readonly title: string | null;
    readonly slug?: string | null;
    readonly image: {
        readonly fileName: string | null;
    } | null;
}
