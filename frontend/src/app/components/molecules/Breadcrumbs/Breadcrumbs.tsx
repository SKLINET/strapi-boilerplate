import React, { ReactElement } from 'react';
import styles from './Breadcrumbs.module.scss';
import clsx from 'clsx';
import { IApp } from '../../../../types/base/app';
import { articleDetailFragment$data } from '../../../../relay/__generated__/articleDetailFragment.graphql';
import { Paragraph } from '../../primitives/Paragraph/Paragraph';
import { appQuery$data } from '../../../../relay/__generated__/appQuery.graphql';
import { getPageUrl } from '../../../../utils/getPageUrl';
import { Link } from '../../primitives/Link/Link';

interface BreadcrumbsProps {
    app: IApp;
    className?: string;
}

type ParentProps = NonNullable<NonNullable<appQuery$data['page']>['attributes']>['parent'] | null | undefined;

const Breadcrumbs = ({ app: { item, page, webSetting, locale }, className }: BreadcrumbsProps): ReactElement => {
    const renderParent = (page: ParentProps): any => {
        if (!page?.data?.attributes) return <></>;

        const { title, url, parent, seo } = page.data.attributes;

        const label = seo?.title || title || '';
        const href = getPageUrl(url || '', locale);

        return (
            <>
                {renderParent(parent as ParentProps)}
                <div className={styles.parent}>
                    <Link href={href} className={styles.link} alt={label}>
                        {label}
                    </Link>
                </div>
                <div className={styles.round} />
            </>
        );
    };

    const renderCurrent = () => {
        if (!page) return <></>;

        const classNames = clsx(styles.label);

        if (item && page.id === webSetting?.data?.attributes?.articleDetailPage?.data?.id) {
            const _item = item as unknown as Omit<articleDetailFragment$data, ' $fragmentType'>;
            if (!_item?.attributes) return <></>;

            const { title, seo } = _item.attributes;

            const label = seo?.title || title;

            return <Paragraph className={classNames}>{label}</Paragraph>;
        }

        const label = page.attributes?.title || '';

        return <Paragraph className={classNames}>{label}</Paragraph>;
    };

    return (
        <div className={clsx(styles.wrapper, className)}>
            {renderParent(page?.attributes?.parent as ParentProps)}
            {renderCurrent()}
        </div>
    );
};

export { Breadcrumbs };
