import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { getSlug } from '@symbio/headless/utils';
import { BaseBlockProps, StaticBlockContext } from '../../types/block';
import { OmitRefType } from '@symbio/headless';
import { ArticleDetailBlock_content$data } from './__generated__/ArticleDetailBlock_content.graphql';
import { ArticlePreviewQuery } from '../../relay/article';
import { IApp } from '../../types/app';
import { articleDetailFragment$data } from '../../relay/__generated__/articleDetailFragment.graphql';
import { ArticleDetail } from '../../components/blocks/ArticleDetail/ArticleDetail';

export interface ArticleDetailBlockStaticProps {
    item: Omit<articleDetailFragment$data, ' $fragmentType'>;
}

export interface ArticleDetailBlockContent extends OmitRefType<ArticleDetailBlock_content$data> {
    __typename: 'ComponentBlockArticleDetailBlock';
}

export interface ArticleDetailBlockProps extends ArticleDetailBlockStaticProps {
    blocksData: Omit<ArticleDetailBlockContent, ' $fragmentType'>;
    app?: IApp;
    className?: string;
}

graphql`
    fragment ArticleDetailBlock_content on ComponentBlockArticleDetailBlock {
        id
    }
`;

const ArticleDetailBlock = ({ blocksData, app, item }: ArticleDetailBlockProps): ReactElement => (
    <ArticleDetail blocksData={blocksData} app={app} item={item} />
);

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
        const provider = providers.article;
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
        if (!item || !item?.data) {
            const err = new Error('Article not found') as Error & { code: string };
            err.code = 'ENOENT';
            throw err;
        }
        return { item: item?.data || {} };
    };
}

ArticleDetailBlock.whyDidYouRender = true;

export default ArticleDetailBlock;
