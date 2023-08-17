import { ImageProps } from './image';

export interface IArticle {
    id: string;
    title: string;
    perex: string | null;
    href: string;
    image: ImageProps;
}
