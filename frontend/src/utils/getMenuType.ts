import { appMenuFragment$data } from '../relay/__generated__/appMenuFragment.graphql';
import { appMenuItemFragment$data } from '../relay/__generated__/appMenuItemFragment.graphql';
import { IMenu, IMenuItem } from '../types/menu';
import { getPageType } from './getPageType';
import { getPageUrl } from './getPageUrl';

export const getMenuItemType = (e: Omit<appMenuItemFragment$data, ' $refType'> | null): IMenuItem | null => {
    if (!e) return null;

    const { id, label, page, externalUrl, openInNewTab } = e;

    const _page = getPageType(page as any);

    if (!_page && !externalUrl) return null;

    return {
        id: id,
        label: label,
        href: _page ? getPageUrl(_page.data.attributes.url) : externalUrl || '',
        openInNewTab: openInNewTab || false,
    };
};

export const getMenuType = (e: Omit<appMenuFragment$data, ' $refType'> | null | undefined): IMenu | null => {
    if (!e || !e.data || !e.data.attributes) return null;

    const _items: IMenuItem[] = [];

    const {
        id,
        attributes: { title, items },
    } = e.data;

    if (!items) return null;

    items.forEach((e) => {
        const _item = getMenuItemType(e as any);

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
