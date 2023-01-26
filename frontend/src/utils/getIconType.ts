import { appIconFragment } from '../relay/__generated__/appIconFragment.graphql';

export const getIconType = (e: Omit<appIconFragment, ' $refType'> | null): string | null => {
    if (!e || !e.data || !e.data.attributes || !e.data.attributes.codename) return null;

    const { codename } = e.data.attributes;

    return codename;
};
