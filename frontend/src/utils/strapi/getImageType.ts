import { appImageFragment$data } from '../../relay/__generated__/appImageFragment.graphql';
import { ImageProps } from '../../types/image';

type Fragment = Omit<appImageFragment$data, ' $fragmentType'>;

export const getImageType = (image: Fragment | null | undefined): ImageProps | null => {
    if (!image || !image.data || !image.data.attributes || !image.data.attributes.url) return null;

    const { url, width, height, alternativeText } = image.data.attributes;

    return {
        data: {
            attributes: {
                url: url,
                width: width || 0,
                height: height || 0,
                alternativeText: alternativeText || '',
            },
        },
    };
};
