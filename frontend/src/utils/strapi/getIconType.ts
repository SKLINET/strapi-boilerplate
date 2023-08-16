import { appIconFragment$data } from '../../relay/__generated__/appIconFragment.graphql';

type StrapiIconFragment = Omit<appIconFragment$data, ' $fragmentType'>;

export const getIconType = (e: StrapiIconFragment | null | undefined): string | null => {
    if (!e || !e.data || !e.data.attributes || !e.data.attributes.codename) return null;

    const { codename } = e.data.attributes;

    return codename || null;
};
