import { appMenuItemFragment$data } from '../../relay/__generated__/appMenuItemFragment.graphql';
import { IMenu, IMenuItem } from '../../types/menu';
import { getPageType } from './getPageType';
import { getPageUrl } from '.././getPageUrl';
import { appMenuEntityFragment$data } from '../../relay/__generated__/appMenuEntityFragment.graphql';

type StrapiMenuFragment = Omit<appMenuEntityFragment$data, ' $fragmentType'>;

export const getMenuItemType = (
    e: Omit<appMenuItemFragment$data, ' $fragmentType'> | null | undefined,
): IMenuItem | null => {
    if (!e) return null;

    const { id, label, page, externalUrl, openInNewTab } = e;

    const _page = getPageType(page);

    if (!_page && !externalUrl) return null;

    return {
        id: id,
        label: label,
        href: _page ? getPageUrl(_page.data.attributes.url) : externalUrl || '',
        openInNewTab: openInNewTab || false,
    };
};

export const getMenuType = (e: StrapiMenuFragment | null | undefined): IMenu | null => {
    if (!e || !e.attributes) return null;

    const _items: IMenuItem[] = [];

    const {
        id,
        attributes: { title, items },
    } = e;

    if (!items) return null;

    items.forEach((e) => {
        const _item = getMenuItemType(e);

        if (!_item) return;

        _items.push(_item);
    });

    if (!id || !title || _items.length === 0) return null;

    return {
        id: id,
        title: title,
        items: _items,
    };
};

export const getMenuListType = (e: ReadonlyArray<StrapiMenuFragment | null> | null | undefined): IMenu[] => {
    const data: IMenu[] = [];

    e?.forEach((k) => {
        const _menu = getMenuType(k);

        if (!_menu) return;

        data.push(_menu);
    });

    return data;
};
