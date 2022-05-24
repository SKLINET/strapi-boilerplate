import { ENUM_COMPONENTMENUMENUITEM_TARGET } from '../relay/__generated__/appQuery.graphql';

export interface Menu {
    type: string;
    items?: MenuItem[] | null[];
}

// @TODO: parent jsem nastavila optional kvuli dummy datum
export interface MenuItem {
    readonly menuItemTitle: string;
    readonly page: {
        readonly url: string;
    } | null;
    readonly externalUrl: string | null;
    readonly target: ENUM_COMPONENTMENUMENUITEM_TARGET;
    // parent?: MenuItem;
    // subMenu?: subMenu[];
}

export interface subMenu {
    title: string;
    image: string;
    items: MenuItem[];
    handleNav?: (() => void) | undefined;
}
