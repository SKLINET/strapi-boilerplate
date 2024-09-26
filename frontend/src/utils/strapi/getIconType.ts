import { getIconName, Icons } from '../../app/components/primitives/Icon/Icon';
import { appIconFragment$data } from '../../relay/__generated__/appIconFragment.graphql';

type Fragment = Omit<appIconFragment$data, ' $fragmentType'>;

export const getIconType = (e: Fragment | null | undefined): Icons | null => {
    if (!e?.codename) return null;

    const { codename } = e;

    return getIconName(codename);
};

export const getIconListType = (e: ReadonlyArray<Fragment | null | undefined> | null | undefined): Icons[] => {
    const data: Icons[] = [];

    e?.forEach((k) => {
        const el = getIconType(k);

        if (!el) return;

        data.push(el);
    });

    return data;
};
