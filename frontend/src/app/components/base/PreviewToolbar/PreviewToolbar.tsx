'use client';

import React, { ReactElement, useState, useEffect } from 'react';
import styles from './PreviewToolbar.module.scss';
import clsx from 'clsx';
import { Icon } from '../../primitives/Icon/Icon';
import { IApp } from '../../../../types/base/app';
import { Link } from '../../primitives/Link/Link';

interface PreviewToolbarProps {
    app: IApp;
}

const PreviewToolbar = ({ app: { item, page, locale } }: PreviewToolbarProps): ReactElement | null => {
    const [isPublished, setIsPublished] = useState<boolean>(item ? !!item?.publishedAt : !!page?.publishedAt);
    const [collection, setCollection] = useState<string>('');
    const [itemId, setItemId] = useState<string | null>(null);
    const title = item?.title || page?.title || '';
    const adminPath = `${process.env.NEXT_PUBLIC_API_BASE_PATH}/admin`;

    useEffect(() => {
        if (item) {
            setIsPublished(!!item?.publishedAt);
            if (item) {
                const id = item.documentId;
                if (item.__typename === 'Article') {
                    setCollection('api::article.article');
                }
                setItemId(id);
            }
        } else {
            setIsPublished(!!page?.publishedAt);
            const id = page?.documentId || '';
            if (page?.url) {
                setCollection('api::page.page');
                setItemId(id);
            }
        }
    }, [page, item]);

    const editUrl = `${adminPath}/content-manager/collection-types/${collection}/${itemId}?plugins[i18n][locale]=${locale}`;

    return (
        <section className={styles.toolbar}>
            <section className={styles.toolbar__left}>
                <Link href={adminPath} className={styles.admin}>
                    <Icon name="sklinet-round" className={styles.logo} />
                </Link>
                <span className={styles.admin__text}>náhled</span>
            </section>

            <section className={styles.toolbar__mid}>
                <div className={styles.item}>
                    <span className={clsx(styles.indicator, isPublished && styles.indicator__active)} />
                    <span className={styles.title}>{title}</span>
                </div>
                <Link className={styles.edit} href={editUrl}>
                    <Icon className={styles.edit__icon} name="edit" />
                    <span className={styles.link__title}>Upravit</span>
                </Link>
            </section>

            <Link href="/api/exit-preview" className={styles.toolbar__right}>
                <Icon name="exit" className={styles.exit} />
                <span className={styles.link__title}>ukončit náhled</span>
            </Link>
        </section>
    );
};

PreviewToolbar.whyDidYouRender = true;

export { PreviewToolbar };
