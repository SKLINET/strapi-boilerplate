import { IPage } from '../../types/page';
import { appPageFragment$data } from '../../relay/__generated__/appPageFragment.graphql';
import { getPageUrl } from '../getPageUrl';
import { IApp } from '../../types/base/app';

type Fragment = Omit<appPageFragment$data, ' $fragmentType'>;

export const getPageType = (e: Fragment | null | undefined, app: IApp): IPage | null => {
    if (!e?.attributes?.url) return null;

    const {
        id,
        attributes: { title, url },
    } = e;

    return {
        id: id || '',
        title: title,
        href: getPageUrl(url, app.locale),
    };
};

export const getPageListType = (
    e: ReadonlyArray<Fragment | null | undefined> | null | undefined,
    app: IApp,
): IPage[] => {
    const data: IPage[] = [];

    e?.forEach((k) => {
        const el = getPageType(k, app);

        if (!el) return;

        data.push(el);
    });

    return data;
};
