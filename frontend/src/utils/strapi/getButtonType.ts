import { IButton } from '../../types/button';
import { getPageType } from './getPageType';
import { getPageUrl } from '.././getPageUrl';
import { appButtonFragment$data } from '../../relay/__generated__/appButtonFragment.graphql';

type StrapiButtonFragment = Omit<appButtonFragment$data, ' $fragmentType'>;

export const getButtonType = (e: StrapiButtonFragment | null | undefined): IButton | null => {
    if (!e) return null;

    const { id, label, page, linkExternal, openInNewTab } = e;

    const _page = getPageType(page);

    if (!_page && !linkExternal) return null;

    return {
        id: id,
        label: label,
        href: _page ? getPageUrl(_page.data.attributes.url) : linkExternal || '',
        openInNewTab: openInNewTab || false,
    };
};

export const getButtonListType = (e: ReadonlyArray<StrapiButtonFragment | null> | null | undefined): IButton[] => {
    const data: IButton[] = [];

    e?.forEach((k) => {
        const _button = getButtonType(k);

        if (!_button) return;

        data.push(_button);
    });

    return data;
};
