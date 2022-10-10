import clsx from 'clsx';
import Link from 'next/link';
import React, { ReactElement, useState, useEffect } from 'react';
import { fetchQuery } from 'react-relay';
import { createRelayEnvironment } from '../../../relay/createRelayEnvironment';
import { PageIdQuery } from '../../../relay/page';
import { pageIdQuery } from '../../../relay/__generated__/pageIdQuery.graphql';
import { PageProps } from '../../../types/page';
import getPublicationState from '../../../utils/getPublicationState';
import { Icon } from '../Icon/Icon';
import styles from './PreviewToolbar.module.scss';

interface PreviewToolbarProps {
    page: PageProps;
    item?: {
        id: string;
        attributes: {
            title: string;
            publishedAt: string;
        };
    };
    locale?: string;
    preview?: boolean;
}

const PreviewToolbar = ({ page, item, locale, preview }: PreviewToolbarProps): ReactElement | null => {
    const [isPublished, setIsPublished] = useState<boolean>(false);
    const [collection, setCollection] = useState<string>('');
    const [itemId, setItemId] = useState<number>(0);
    const title = item?.attributes?.title || page?.title || '';
    const adminPath = process.env.ADMIN_PATH;

    useEffect(() => {
        if (item) {
            setIsPublished(item?.attributes?.publishedAt ? true : false);
            if (item?.id) {
                if (item?.id?.includes('Article')) {
                    setCollection('api::article.article');
                    setItemId(Number(item?.id?.replace('Article_', '')));
                }
            }
        } else {
            setIsPublished(page?.publishedAt ? true : false);
            if (page?.url) {
                setCollection('api::page.page');
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
