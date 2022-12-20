import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import styles from './ArticleDetailBlock.module.scss';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { getSlug } from '@symbio/headless/utils';
import { BaseBlockProps, StaticBlockContext } from '../../types/block';
import { NewsDetail } from '../../components/blocks/NewsDetail/NewsDetail';
import { ArticlePreviewQuery } from '../../relay/article';

graphql`
    fragment ArticleDetailBlock_content on ComponentBlockArticleDetailBlock {
        id
        sectionId
    }
`;

function ArticleDetailBlock({ blocksData, item, app }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    const className = '';
    const article = item.attributes;
    return (
        <BlockWrapper className={`flex-col ${styles.wrapper}`}>
            {article && article.content && (
                <NewsDetail
                    item={{
                        ...article,
                        dateFrom: String(article.date),
                        title: String(article.title),
                        slug: String(article.url),
                        content: article.content as never,
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
        context: { params, preview, previewData },
        block,
    }: StaticBlockContext): Promise<BaseBlockProps> => {
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
        const variables: Record<string, unknown> = {
            locale,
            preview,
            slug: slug,
        };
        if (previewData?.itemId && slug === previewData?.itemSlug) {
            provider.setFindOneQuery(ArticlePreviewQuery);
            variables.id = previewData?.itemId || '';
        }
        const item = await provider.findOne(variables);
        if (!item) {
            const err = new Error('Article not found') as Error & { code: string };
            err.code = 'ENOENT';
            throw err;
        }
        return { item: item?.data || {} };
    };
}

ArticleDetailBlock.whyDidYouRender = true;

export default ArticleDetailBlock;
