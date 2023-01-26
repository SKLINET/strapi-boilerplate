import { appSystemResourceFragment } from '../relay/__generated__/appSystemResourceFragment.graphql';

export const getSystemResource = (key: string, e: appSystemResourceFragment | null | undefined): string => {
    if (!e || !e.data) return '';

    return e.data.find((k) => k.attributes?.codename.toString() === key.toString())?.attributes?.value || '';
};
