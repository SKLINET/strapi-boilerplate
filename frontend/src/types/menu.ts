export interface IMenu {
    id: string;
    title: string;
    items: IMenuItem[];
}

export interface IMenuItem {
    id: string;
    label: string;
    href: string;
    openInNewTab: boolean;
}
