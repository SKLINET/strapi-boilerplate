import { ImageProps } from './image';

export interface IArticle {
    id: string;
    title: string;
    href: string;
    category: IArticleCategory | null;
    image: ImageProps;
    totalTime: number;
    publishDate: string;
    content: string | null;
}

export interface IArticleCategory {
    id: string;
    title: string;
}
