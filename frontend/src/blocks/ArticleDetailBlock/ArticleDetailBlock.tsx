import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import styles from './ArticleDetailBlock.module.scss';
import config from '../../../sklinet.config.json';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { BaseBlockProps } from '../../types/block';
import providers from '../../providers';
import { newsDetailQueryResponse } from '../../relay/__generated__/newsDetailQuery.graphql';
import { getId, getSlug } from '@symbio/headless/utils';
import { StaticBlockContext } from '@symbio/headless';
import { WebSettingsProps } from '../../types/webSettings';
import { Providers } from '../../types/providers';
import { Locale } from '../../types/locale';
import { GetStaticPathsResult } from 'next';
import { NewsDetail } from '../../components/blocks/NewsDetail/NewsDetail';

graphql`
    fragment ArticleDetailBlock_content on ComponentBlockArticleDetailBlock {
        id
        sectionId
    }
`;

function ArticleDetailBlock({ blocksData, item, app }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    const className = '';
    return (
        <BlockWrapper className={`flex-col ${styles.wrapper}`}>
            {item && item.content && (
                <NewsDetail
                    item={{
                        ...item,
                        dateFrom: String(item.date),
                        title: String(item.title),
                        slug: String(item.url),
                        content: item.content as never,
                    }}
                    app={app}
                    className={className}
                />
            )}
        </BlockWrapper>
    );
}

if (typeof window === 'undefined') {
    ArticleDetailBlock.getStaticProps = async ({
        locale,
        providers,
        context: { params, preview },
        block,
    }: StaticBlockContext<any, WebSettingsProps, Providers, Locale>): Promise<BaseBlockProps> => {
        if (!params || !params.slug || block?.__typename !== 'ComponentBlockArticleDetailBlock') {
            const err = new Error('Page not found') as Error & { code: string };
            err.code = 'ENOENT';
            throw err;
        }
        const slug = getSlug(params.slug);
        if (!slug) {
            const err = new Error('Page not found') as Error & { code: string };
            err.code = 'ENOENT';
            throw err;
        }
        const provider = providers.news;
        const item = await provider.findOne({
            locale: locale,
            preview,
            slug: slug,
        });
        if (!item) {
            const err = new Error('Article not found') as Error & { code: string };
            err.code = 'ENOENT';
            throw err;
        }
        return { item: item?.data?.attributes || {} };
    };
}

ArticleDetailBlock.whyDidYouRender = true;

export default ArticleDetailBlock;
