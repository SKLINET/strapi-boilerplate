export interface ImageProps {
    data: {
        attributes: {
            url: string;
            width: number;
            height: number;
            alternativeText: string;
        };
    };
}
