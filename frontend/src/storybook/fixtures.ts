import { IApp } from '../types/base/app';

/**
 * Shared fixtures for Storybook stories.
 *
 * Components in this project take the whole `app` object (Strapi data + locale +
 * system resources) instead of narrow props, so stories need a realistic stub.
 * Keep it in sync with the shapes the components actually read.
 */

export const systemResources = [
    { codename: 'all', value: 'Vše' },
    { codename: 'clear_select', value: 'Zrušit výběr' },
    { codename: 'empty_select_list', value: 'Žádné výsledky' },
    { codename: 'file_size_error', value: 'Soubor je větší než {value} MB' },
    { codename: 'file_type_error', value: 'Povolené jsou jen: {allowedTypes}' },
    { codename: 'filter_by_value', value: 'Filtrovat podle {value}' },
    { codename: 'go_to_homepage', value: 'Přejít na úvodní stránku' },
    { codename: 'go_to_value', value: 'Přejít na {value}' },
    { codename: 'hide_menu', value: 'Skrýt menu' },
    { codename: 'hide_select', value: 'Skrýt možnosti' },
    { codename: 'load_more', value: 'Načíst další' },
    { codename: 'open_select', value: 'Zobrazit možnosti' },
    { codename: 'play_video', value: 'Přehrát video' },
    { codename: 'remove_file', value: 'Odstranit soubor' },
    { codename: 'required_field', value: 'Povinné pole' },
    { codename: 'show_menu', value: 'Zobrazit menu' },
    { codename: 'upload_attachment', value: 'Nahrát přílohu' },
    { codename: 'upload_attachments', value: 'Nahrát přílohy' },
];

export const homePage = {
    documentId: 'home',
    title: 'Úvod',
    url: 'homepage',
};

export const mainMenu = {
    documentId: 'menu-main',
    title: 'Hlavní menu',
    items: [
        {
            id: 'menu-1',
            label: 'O nás',
            page: { documentId: 'p-about', title: 'O nás', url: 'o-nas' },
            externalUrl: null,
            openInNewTab: false,
            anchor: null,
        },
        {
            id: 'menu-2',
            label: 'Reference',
            page: { documentId: 'p-refs', title: 'Reference', url: 'reference' },
            externalUrl: null,
            openInNewTab: false,
            anchor: null,
        },
        {
            id: 'menu-3',
            label: 'Kontakt',
            page: { documentId: 'p-contact', title: 'Kontakt', url: 'kontakt' },
            externalUrl: null,
            openInNewTab: false,
            anchor: null,
        },
    ],
};

export const page = {
    documentId: 'p-about',
    title: 'O nás',
    url: 'o-nas',
    publishedAt: '2026-01-15T10:00:00.000Z',
    seo: { title: 'O nás' },
    parent: {
        documentId: 'home',
        title: 'Úvod',
        url: 'homepage',
        seo: null,
        parent: null,
    },
};

/**
 * Minimal but realistic `app` stub. Cast at the boundary — the real type is a
 * generated Relay union that cannot be constructed by hand.
 */
export const app = {
    locale: 'cs',
    preview: false,
    page,
    item: null,
    blocksPropsMap: {},
    systemResources,
    webSetting: {
        documentId: 'ws-1',
        homePage,
        mainMenu,
        articlesPage: { documentId: 'p-blog', title: 'Blog', url: 'blog' },
        facebook: 'https://facebook.com/sklinet',
        instagram: 'https://instagram.com/sklinet',
    },
} as unknown as IApp;

export const image = {
    id: 'img-1',
    documentId: 'img-1',
    url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200&q=80',
    width: 1200,
    height: 800,
    alternativeText: 'Skleněná fasáda',
};

export const article = {
    id: 'a-1',
    title: 'První článek',
    href: '/blog/prvni-clanek',
    category: { id: 'c-1', title: 'Novinky' },
    image,
    totalTime: 3,
    publishDate: '2026-01-10',
    content: null,
};

export const articleCategories = [
    { id: 'c-1', title: 'Novinky' },
    { id: 'c-2', title: 'Projekty' },
];
