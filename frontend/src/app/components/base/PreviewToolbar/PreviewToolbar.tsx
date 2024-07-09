'use client';

import React, { ReactElement, useState, useEffect } from 'react';
import styles from './PreviewToolbar.module.scss';
import clsx from 'clsx';
import { Icon } from '../../primitives/Icon/Icon';
import { getItemId } from '../../../../utils/getItemId';
import { IApp } from '../../../../types/base/app';

interface PreviewToolbarProps {
    app: IApp;
}

const PreviewToolbar = ({ app: { item, page, locale, preview } }: PreviewToolbarProps): ReactElement | null => {
    const [isPublished, setIsPublished] = useState<boolean>(false);
    const [collection, setCollection] = useState<string>('');
    const [itemId, setItemId] = useState<number>(0);
    const title = item?.attributes?.title || page?.attributes?.title || '';
    const adminPath = `${process.env.NEXT_PUBLIC_API_BASE_PATH}/admin`;

    useEffect(() => {
        if (item) {
            setIsPublished(!!item?.attributes?.publishDate);
            if (item?.id) {
                const id = getItemId(item?.id);
                if (item?.id?.includes('Article')) {
                    setCollection('api::article.article');
                }
                setItemId(Number(id));
            }
        } else {
            setIsPublished(!!page?.attributes?.publishedAt);
            const id = getItemId(page?.id || '');
            if (page?.attributes?.url) {
                setCollection('api::page.page');
                setItemId(Number(page?.id?.replace('Page_', '')));
                setItemId(Number(id));
            }
        }
    }, [page, item]);

    const editUrl = `${adminPath}/content-manager/collectionType/${collection}/${itemId}?plugins[i18n][locale]=${locale}`;

    return (
        <section className={styles.toolbar}>
            <section className={styles.toolbar__left}>
                <a href={adminPath} className={styles.admin}>
                    <Icon name={'sklinet-round'} className={styles.logo} />
                </a>
                <span className={styles.admin__text}>náhľad</span>
            </section>

            <section className={styles.toolbar__mid}>
                <div className={styles.item}>
                    <span className={clsx(styles.indicator, isPublished && styles.indicator__active)} />
                    <span className={styles.title}>{title}</span>
                </div>
                <a className={styles.edit} href={editUrl}>
                    <Icon className={styles.edit__icon} name={'edit'} />
                    <span className={styles.link__title}>Upraviť</span>
                </a>
            </section>

            <a href={'/api/exit-preview'} className={styles.toolbar__right}>
                <Icon name={'exit'} className={styles.exit} />
                <span className={styles.link__title}>ukončiť náhľad</span>
            </a>
        </section>
    );
};

PreviewToolbar.whyDidYouRender = true;

export { PreviewToolbar };
