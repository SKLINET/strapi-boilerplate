import { IImage } from './image';

export interface IArticle {
    id: string;
    title: string;
    href: string;
    category: IArticleCategory | null;
    image: IImage;
    totalTime: number;
    publishDate: string;
    content: string | null;
}

export interface IArticleCategory {
    id: string;
    title: string;
}
