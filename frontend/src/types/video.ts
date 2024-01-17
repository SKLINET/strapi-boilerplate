import { ImageProps } from './image';

export interface IVideo {
    id: string;
    uploadedVideo: IUploadedVideo | null;
    externalVideo: any | null;
    image: ImageProps | null;
}

export interface IUploadedVideo {
    url: string;
    type: string;
}
