import { IPage } from '../types/page';
import { appPageFragment } from '../relay/__generated__/appPageFragment.graphql';

export const getPageType = (e: Omit<appPageFragment, ' $refType'> | null): IPage | null => {
    if (!e || !e.data || !e.data.attributes || !e.data.attributes.url) return null;

    const { url } = e.data.attributes;

    return {
        data: {
            attributes: {
                url: url,
            },
        },
    };
};
