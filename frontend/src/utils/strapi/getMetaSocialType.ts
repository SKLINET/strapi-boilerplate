import { IMetaSocial } from '../../types/social';
import { appMetaSocialFragment$data } from '../../relay/__generated__/appMetaSocialFragment.graphql';
import { getImageType } from './getImageType';

type Fragment = Omit<appMetaSocialFragment$data, ' $fragmentType'>;

export const getMetaSocialType = (e: Fragment | null | undefined): IMetaSocial | null => {
    if (!e) return null;

    const { id, title, description, image } = e;

    const _image = getImageType(image?.data, true);

    if (!_image) return null;

    return {
        id: id || '',
        title: title,
        description: description || null,
        image: _image,
    };
};
