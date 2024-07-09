import { IImage } from './image';

export interface ISocialNetworks {
    id: string;
    facebook: IMetaSocial | null;
    twitter: IMetaSocial | null;
}

export interface IMetaSocial {
    id: string;
    title: string;
    description: string | null;
    image: IImage;
}
