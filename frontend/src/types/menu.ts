export interface MenuItem {
    readonly title: string;
    readonly page: {
        readonly data: {
            readonly attributes: {
                readonly url: string;
            };
        };
    };
    readonly externalUrl?: string;
    readonly target: string;
    readonly showMegaMenu: boolean;
}
