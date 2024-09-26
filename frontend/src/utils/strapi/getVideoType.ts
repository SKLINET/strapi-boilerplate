import { appVideoFragment$data } from '../../relay/__generated__/appVideoFragment.graphql';
import { IVideo } from '../../types/video';
import { getImageType } from './getImageType';
import { getUploadedVideoType } from './getUploadedVideoType';

type Fragment = Omit<appVideoFragment$data, ' $fragmentType'>;

export const getVideoType = (e: Fragment | null | undefined): IVideo | null => {
    if (!e) return null;

    const { id, uploadedVideo, externalVideo, optionalImage } = e;

    return {
        id: id,
        uploadedVideo: getUploadedVideoType(uploadedVideo),
        externalVideo: externalVideo || null,
        image: getImageType(optionalImage),
    };
};
