export interface VideoProps {
    data?: {
        attributes?: {
            url?: string;
            width?: number;
            height?: number;
            alternativeText?: string;
        };
    };
    url: string;
    provider: string;
    providerUid: string;
    width?: number;
    height?: number;
    title?: string;
    thumbnailUrl?: string;
    videoId: string;
}
