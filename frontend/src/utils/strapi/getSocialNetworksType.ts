import { ISocialNetworks } from '../../types/social';
import { appSocialNetworksFragment$data } from '../../relay/__generated__/appSocialNetworksFragment.graphql';
import { getMetaSocialType } from './getMetaSocialType';

type Fragment = Omit<appSocialNetworksFragment$data, ' $fragmentType'>;

export const getSocialNetworksType = (e: Fragment | null | undefined): ISocialNetworks | null => {
    if (!e) return null;

    const { id, facebookMeta, twitterMeta } = e;

    const facebook = getMetaSocialType(facebookMeta);
    const twitter = getMetaSocialType(twitterMeta);

    return {
        id: id || '',
        facebook: facebook,
        twitter: twitter,
    };
};
