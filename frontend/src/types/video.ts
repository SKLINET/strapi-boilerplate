export interface IVideo {
    url: string;
}

export interface VideoProps {
    data?: {
        attributes?: {
            url?: string;
            width?: number;
            height?: number;
            alternativeText?: string;
        };
    } | null;
    url: string;
    provider: string;
    providerUid: string;
    width?: number;
    height?: number;
    title?: string;
    thumbnailUrl?: string;
    videoId?: string | null;
}
