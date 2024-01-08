import { IButton } from '../../types/button';
import { getPageType } from './getPageType';
import { getPageUrl } from '.././getPageUrl';
import { appButtonFragment$data } from '../../relay/__generated__/appButtonFragment.graphql';
import { IApp } from '../../types/app';

type Fragment = Omit<appButtonFragment$data, ' $fragmentType'>;

export const getButtonType = (e: Fragment | null | undefined, app: IApp): IButton | null => {
    if (!e) return null;

    const { id, label, page, linkExternal, openInNewTab } = e;

    const _page = getPageType(page);

    if (!_page && !linkExternal) return null;

    const href = _page ? getPageUrl(_page.data.attributes.url, app.locale) : linkExternal || '';

    return {
        id: id,
        label: label,
        href: href,
        openInNewTab: openInNewTab || false,
    };
};

export const getButtonListType = (
    e: ReadonlyArray<Fragment | null | undefined> | null | undefined,
    app: IApp,
): IButton[] => {
    const data: IButton[] = [];

    e?.forEach((k) => {
        const el = getButtonType(k, app);

        if (!el) return;

        data.push(el);
    });

    return data;
};
