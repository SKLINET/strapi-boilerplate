import React, { ReactElement, useRef } from 'react';
import styles from './ArticleDetail.module.scss';
import clsx from 'clsx';
import Head from 'next/head';
import { ArticleDetailBlockProps } from '../../../blocks/ArticleDetailBlock/ArticleDetailBlock';
import { getPageUrl } from '../../../utils/getPageUrl';
import { useIsVisible } from '../../../utils/hooks/useIsVisible';

export type ArticleDetailProps = {
    blocksData: ArticleDetailBlockProps['blocksData'];
    app: ArticleDetailBlockProps['app'];
    item: ArticleDetailBlockProps['item'];
};

const ArticleDetail = ({ blocksData, app, item }: ArticleDetailProps): ReactElement => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible] = useIsVisible(ref);

    const metaTitle =
        item?.attributes?.seo?.title ||
        item?.attributes?.seo?.metaTitle ||
        item?.attributes?.title ||
        app?.webSetting?.data?.attributes?.globalSeo?.titleSuffix;

    return (
        <>
            <Head>
                {metaTitle && <title>{metaTitle}</title>}
                {metaTitle && <meta name="title" content={metaTitle} />}
                {metaTitle && <meta property="og:title" content={metaTitle} />}
                <meta property="og:url" content={getPageUrl(item?.attributes?.slug || '', '', true)} />
            </Head>
            <div className={clsx(styles.wrapper, isVisible && styles.isVisible)} ref={ref}>
                <h2 className="text-black text-4xl text-center mb-6">Article detail block</h2>
                <pre className="bg-grey text-black p-8 overflow-x-auto">{JSON.stringify(item, null, 2)}</pre>
            </div>
        </>
    );
};

export { ArticleDetail };
