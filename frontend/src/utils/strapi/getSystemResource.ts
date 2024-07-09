import { appSystemResourceFragment$data } from '../../relay/__generated__/appSystemResourceFragment.graphql';

type Fragment = Omit<appSystemResourceFragment$data, ' $fragmentType'>;

export const getSystemResource = (
    key: string,
    data: ReadonlyArray<Fragment | null | undefined> | null | undefined,
): string => {
    if (!data) return '';

    const el = data.find((e) => {
        if (!e?.attributes) return false;

        return e.attributes.codename.toString() === key.toString();
    });

    return el?.attributes?.value || '';
};
