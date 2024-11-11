import { IImage } from '../../types/image';
import { appImageFragment$data } from '../../relay/__generated__/appImageFragment.graphql';
import { getImageUrl } from '../getImageUrl';

type Fragment = Omit<appImageFragment$data, ' $fragmentType'>;

export const getImageType = (e: Fragment | null | undefined, smallResolution = false): IImage | null => {
    if (!e) return null;

    const { documentId, url, alternativeText, width, height } = e;

    return {
        id: documentId,
        url: getImageUrl(url, smallResolution),
        width: width || 0,
        height: height || 0,
        alternativeText: alternativeText || '',
    };
};

export const getImageListType = (e: ReadonlyArray<Fragment | null | undefined> | null | undefined): IImage[] => {
    const data: IImage[] = [];

    e?.forEach((k) => {
        const el = getImageType(k);

        if (!el) return;

        data.push(el);
    });

    return data;
};
