import { appSeoFragment$data } from '../relay/__generated__/appSeoFragment.graphql';
import { getImageUrl } from './getImageUrl';
import { getImageType } from './strapi/getImageType';

type ISocialMeta = NonNullable<Omit<appSeoFragment$data, ' $fragmentType'>>['metaSocial'] | null | undefined;

export interface ISocialShareMeta {
    og: {
        title?: string | null;
        description?: string | null;
        image?: string | null;
    };
    twitter: {
        title?: string | null;
        description?: string | null;
        image?: string | null;
    };
}

export const getSocialShareMeta = (e: ISocialMeta): ISocialShareMeta | null => {
    if (!e || e.length === 0) return null;

    const socialShare: ISocialShareMeta = {
        og: {
            title: undefined,
            description: undefined,
            image: undefined,
        },
        twitter: {
            title: undefined,
            description: undefined,
            image: undefined,
        },
    };

    e.forEach((item) => {
        if (!item) return;

        const { socialNetwork, title, description, image } = item;

        const _image = getImageType(image);

        if (socialNetwork === 'Facebook') {
            socialShare.og.title = title;
            socialShare.og.description = description;
            socialShare.og.image = _image ? getImageUrl(_image.data.attributes.url, true) : null;

            return;
        }

        if (socialNetwork === 'Twitter') {
            socialShare.twitter.title = title;
            socialShare.twitter.description = description;
            socialShare.twitter.image = _image ? getImageUrl(_image.data.attributes.url, true) : null;

            return;
        }
    });

    return socialShare;
};
