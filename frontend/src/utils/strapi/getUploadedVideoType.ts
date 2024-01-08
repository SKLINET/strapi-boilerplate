import { appUploadedVideoFragment$data } from '../../relay/__generated__/appUploadedVideoFragment.graphql';
import { IUploadedVideo } from '../../types/video';
import { getImageUrl } from '../getImageUrl';

type Fragment = Omit<appUploadedVideoFragment$data, ' $fragmentType'>;

export const getUploadedVideoType = (video: Fragment | null | undefined): IUploadedVideo | null => {
    if (!video || !video.data || !video.data.attributes || !video.data.attributes.url) return null;

    const { url } = video.data.attributes;

    const type = url.split('.') || [];

    if (type.length === 0) return null;

    const _url = getImageUrl(url);
    const _type = type[type.length - 1];

    return {
        url: _url,
        type: `video/${_type}`,
    };
};
