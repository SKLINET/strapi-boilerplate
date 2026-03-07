import { ReactElement } from 'react';
import styles from './Breadcrumbs.module.scss';
import clsx from 'clsx';
import { IApp } from '../../../../types/base/app';
import { articleDetailFragment$data } from '../../../../relay/__generated__/articleDetailFragment.graphql';
import { Text } from '../../primitives/Text/Text';
import { appPageQuery$data } from '../../../../relay/__generated__/appPageQuery.graphql';
import { getPageUrl } from '../../../../utils/getPageUrl';
import { Link } from '../../primitives/Link/Link';

interface BreadcrumbsProps {
    app: IApp;
    className?: string;
}

type ParentProps = NonNullable<NonNullable<appPageQuery$data['page']>>['parent'] | null | undefined;

const Breadcrumbs = ({ app: { item, page, webSetting, locale }, className }: BreadcrumbsProps): ReactElement => {
    const renderParent = (page: ParentProps): any => {
        if (!page) return <></>;

        const { title, url, parent, seo } = page;

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

        if (item?.__typename === 'Article') {
            const _item = item as unknown as Omit<articleDetailFragment$data, ' $fragmentType'>;
            if (!_item) return <></>;

            const { title, seo } = _item;

            const label = seo?.title || title;

            return <Text className={classNames}>{label}</Text>;
        }

        const label = page.title || '';

        return <Text className={classNames}>{label}</Text>;
    };

    return (
        <div className={clsx(styles.wrapper, className)}>
            {renderParent(page?.parent as ParentProps)}
            {renderCurrent()}
        </div>
    );
};

export { Breadcrumbs };
