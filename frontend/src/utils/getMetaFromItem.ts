import { appSeoFragment$data } from '../relay/__generated__/appSeoFragment.graphql';
import { articleDetailFragment$data } from '../relay/__generated__/articleDetailFragment.graphql';
import { IApp } from '../types/app';
import { ImageProps } from '../types/image';
import { getImageType } from './strapi/getImageType';

interface IItemMeta {
    title?: string | null;
    description?: string | null;
    image?: ImageProps | null;
    seo: Omit<appSeoFragment$data, ' $fragmentType'> | null | undefined;
}

export const getMetaFromItem = (item: IApp['item']): IItemMeta | null => {
    if (!item) return null;

    if (item.id?.includes('Article')) {
        const _item = item as unknown as Omit<articleDetailFragment$data, ' $fragmentType'>;
        if (!_item?.attributes) return null;

        const { title, image, seo } = _item.attributes;

        const _image = getImageType(image);

        return { title, description: null, image: _image, seo: seo };
    }

    return null;
};
