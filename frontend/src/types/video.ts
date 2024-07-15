import { IImage } from './image';

export interface IVideo {
    id: string;
    uploadedVideo: IUploadedVideo | null;
    externalVideo: any | null;
    image: IImage | null;
}

export interface IUploadedVideo {
    url: string;
    type: string;
}
