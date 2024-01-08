import { appMenuItemFragment$data } from '../../relay/__generated__/appMenuItemFragment.graphql';
import { IMenu, IMenuItem } from '../../types/menu';
import { getPageType } from './getPageType';
import { getPageUrl } from '.././getPageUrl';
import { appMenuEntityFragment$data } from '../../relay/__generated__/appMenuEntityFragment.graphql';
import { IApp } from '../../types/app';

type Fragment = Omit<appMenuEntityFragment$data, ' $fragmentType'>;

export const getMenuItemType = (
    e: Omit<appMenuItemFragment$data, ' $fragmentType'> | null | undefined,
    app: IApp,
): IMenuItem | null => {
    if (!e) return null;

    const { id, label, page, externalUrl, openInNewTab } = e;

    const _page = getPageType(page);

    if (!_page && !externalUrl) return null;

    const href = _page ? getPageUrl(_page.data.attributes.url, app.locale) : externalUrl || '';

    return {
        id: id,
        label: label,
        href: href,
        openInNewTab: openInNewTab || false,
    };
};

export const getMenuType = (e: Fragment | null | undefined, app: IApp): IMenu | null => {
    if (!e || !e.attributes) return null;

    const _items: IMenuItem[] = [];

    const {
        id,
        attributes: { title, items },
    } = e;

    if (!items) return null;

    items.forEach((e) => {
        const el = getMenuItemType(e, app);

        if (!el) return;

        _items.push(el);
    });

    if (!id || !title || _items.length === 0) return null;

    return {
        id: id,
        title: title,
        items: _items,
    };
};

export const getMenuListType = (e: ReadonlyArray<Fragment | null> | null | undefined, app: IApp): IMenu[] => {
    const data: IMenu[] = [];

    e?.forEach((k) => {
        const el = getMenuType(k, app);

        if (!el) return;

        data.push(el);
    });

    return data;
};
