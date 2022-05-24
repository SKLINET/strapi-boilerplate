export interface ImageProps {
    data: {
        attributes: {
            url: string;
            width: number;
            height: number;
            alternativeText: string;
            fp?: {
                readonly x: number | null;
                readonly y: number | null;
            } | null;
        };
    };
}
