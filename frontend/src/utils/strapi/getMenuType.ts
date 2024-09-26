import { appMenuItemFragment$data } from '../../relay/__generated__/appMenuItemFragment.graphql';
import { IMenu, IMenuItem } from '../../types/menu';
import { getPageType } from './getPageType';
import { appMenuFragment$data } from '../../relay/__generated__/appMenuFragment.graphql';
import { IApp } from '../../types/base/app';

type Fragment = Omit<appMenuFragment$data, ' $fragmentType'>;

export const getMenuItemType = (
    e: Omit<appMenuItemFragment$data, ' $fragmentType'> | null | undefined,
    app: IApp,
): IMenuItem | null => {
    if (!e) return null;

    const { id, label, page, externalUrl, openInNewTab } = e;

    const _page = getPageType(page, app);

    const href = _page?.href || externalUrl;

    if (!href) return null;

    return {
        id: id,
        label: label,
        href: href,
        openInNewTab: openInNewTab || false,
    };
};

export const getMenuType = (e: Fragment | null | undefined, app: IApp): IMenu | null => {
    if (!e) return null;

    const _items: IMenuItem[] = [];

    const { documentId, title, items } = e;

    if (!items) return null;

    items.forEach((e) => {
        const el = getMenuItemType(e, app);

        if (!el) return;

        _items.push(el);
    });

    if (_items.length === 0) return null;

    return {
        id: documentId,
        title: title,
        items: _items,
    };
};

export const getMenuListType = (
    e: ReadonlyArray<Fragment | null | undefined> | null | undefined,
    app: IApp,
): IMenu[] => {
    const data: IMenu[] = [];

    e?.forEach((k) => {
        const el = getMenuType(k, app);

        if (!el) return;

        data.push(el);
    });

    return data;
};
