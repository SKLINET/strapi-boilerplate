import { IPage } from '../../types/page';
import { appPageFragment$data } from '../../relay/__generated__/appPageFragment.graphql';

type Fragment = Omit<appPageFragment$data, ' $fragmentType'>;

export const getPageType = (e: Fragment | null | undefined): IPage | null => {
    if (!e || !e.data || !e.data.attributes || !e.data.attributes.url) return null;

    const { url } = e.data.attributes;

    return {
        data: {
            attributes: {
                url: url || '',
            },
        },
    };
};
