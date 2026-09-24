'use client';

import { ReactElement, ReactNode } from 'react';
import styles from './PreviewToolbar.module.scss';
import clsx from 'clsx';
import { Icon } from '../../primitives/Icon/Icon';
import { IApp } from '../../../../types/base/app';
import { Link } from '../../primitives/Link/Link';

interface PreviewToolbarProps {
    app: IApp;
}

/** Strapi content-type UIDs of the documents that can be previewed as `app.item`, by GraphQL type. */
const ITEM_COLLECTIONS: Record<string, string> = {
    Article: 'api::article.article',
};

/** A 16px line icon drawn like the CMS admin icons. */
const ToolbarIcon = ({ children }: { children: ReactNode }): ReactElement => (
    <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
    >
        {children}
    </svg>
);

const PreviewToolbar = ({ app: { item, page, locale } }: PreviewToolbarProps): ReactElement | null => {
    const adminPath = `${process.env.NEXT_PUBLIC_API_BASE_PATH}/admin`;

    const doc = item ?? page;
    const collection = item ? ITEM_COLLECTIONS[item.__typename] : 'api::page.page';

    const title = doc?.title || '';
    const isPublished = !!doc?.publishedAt;
    const editUrl =
        doc && collection
            ? `${adminPath}/content-manager/collection-types/${collection}/${doc.documentId}?plugins[i18n][locale]=${locale}`
            : adminPath;

    return (
        <aside className={styles.toolbar} aria-label="Náhled">
            <div className={styles.brand}>
                <Link href={adminPath} alt="Go to Strapi admin" className={styles.home}>
                    <Icon name="sklinet" className={styles.mark} />
                </Link>
                <span className={styles.badge}>Náhled</span>
            </div>

            <div className={styles.doc}>
                {doc && (
                    <span className={clsx(styles.status, isPublished && styles.status__published)}>
                        {isPublished ? 'Publikováno' : 'Koncept'}
                    </span>
                )}
                <span className={styles.title}>{title}</span>
            </div>

            <div className={styles.actions}>
                <Link className={clsx(styles.button, styles.button__primary)} href={editUrl} alt="Edit in Strapi">
                    <ToolbarIcon>
                        <path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-4-4L4 16v4Z" />
                        <path d="m13.5 6.5 4 4" />
                    </ToolbarIcon>
                    <span className={styles.label}>Upravit</span>
                </Link>

                {/* A plain anchor: a router navigation would redraw the draft from the client cache. */}
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- an API route, not a page */}
                <a
                    href="/api/exit-preview"
                    aria-label="Exit preview"
                    className={clsx(styles.button, styles.button__secondary)}
                >
                    <ToolbarIcon>
                        <path d="M9 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3M15 16l4-4-4-4M19 12H9" />
                    </ToolbarIcon>
                    <span className={styles.label}>Ukončit náhled</span>
                </a>
            </div>
        </aside>
    );
};

PreviewToolbar.whyDidYouRender = true;

export { PreviewToolbar };
