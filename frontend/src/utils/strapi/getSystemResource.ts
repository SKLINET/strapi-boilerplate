import { appSystemResourceFragment$data } from '../../relay/__generated__/appSystemResourceFragment.graphql';

type Fragment = Omit<appSystemResourceFragment$data, ' $fragmentType'>;

export const getSystemResource = (
    key: string,
    data: ReadonlyArray<Fragment | null | undefined> | null | undefined,
): string => {
    if (!data) return '';

    const el = data.find((e) => {
        if (!e) return false;

        return e.codename.toString() === key.toString();
    });

    if (!el) {
        console.error('Chybějící všeobecný text: ', key);
        return `{${key}}`;
    }

    return el?.value || '';
};
