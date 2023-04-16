import { IButton } from '../types/button';
import { getPageType } from './getPageType';
import { getPageUrl } from './getPageUrl';
import { appButtonFragment$data } from '../relay/__generated__/appButtonFragment.graphql';

export const getButtonType = (e: Omit<appButtonFragment$data, ' $refType'> | null): IButton | null => {
    if (!e) return null;

    const { id, label, page, linkExternal, openInNewTab } = e;

    const _page = getPageType(page as any);

    if (!_page && !linkExternal) return null;

    return {
        id: id,
        label: label,
        href: _page ? getPageUrl(_page.data.attributes.url) : linkExternal || '',
        openInNewTab: openInNewTab || false,
    };
};
