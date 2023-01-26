import { appVideoFragment } from '../relay/__generated__/appVideoFragment.graphql';
import { IVideo } from '../types/video';
import { getImageUrl } from './getImageUrl';

export const getVideoType = (video: Omit<appVideoFragment, ' $refType'>): IVideo | null => {
    if (!video || !video.data || !video.data.attributes || !video.data.attributes.url) return null;

    const { url } = video.data.attributes;

    return {
        url: getImageUrl(url),
    };
};
