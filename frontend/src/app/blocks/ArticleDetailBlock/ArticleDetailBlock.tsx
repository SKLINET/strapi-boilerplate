import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { getSlug } from '@symbio/headless/utils';
import { BaseBlockProps, StaticBlockContext } from '../../../types/base/block';
import { OmitRefType } from '@symbio/headless';
import { ArticleDetailBlock_content$data } from './__generated__/ArticleDetailBlock_content.graphql';
import { IApp } from '../../../types/base/app';
import { articleDetailFragment$data } from '../../../relay/__generated__/articleDetailFragment.graphql';
import { ArticleDetail } from '../../components/blocks/ArticleDetail/ArticleDetail';

export interface ArticleDetailBlockStaticProps {
    item: Omit<articleDetailFragment$data, ' $fragmentType'>;
}

export interface ArticleDetailBlockContent extends OmitRefType<ArticleDetailBlock_content$data> {
    __typename: 'ComponentBlockArticleDetailBlock';
}

export interface ArticleDetailBlockProps extends ArticleDetailBlockStaticProps {
    blocksData: Omit<ArticleDetailBlockContent, ' $fragmentType'>;
    app: IApp;
    className?: string;
}

graphql`
    fragment ArticleDetailBlock_content on ComponentBlockArticleDetailBlock {
        id
    }
`;

const ArticleDetailBlock = (data: ArticleDetailBlockProps): ReactElement => <ArticleDetail {...data} />;

if (typeof window === 'undefined') {
    ArticleDetailBlock.getStaticProps = async ({
        locale,
        providers,
        context: { params, preview: previewValue, previewData },
        block,
    }: StaticBlockContext): Promise<BaseBlockProps> => {
        const preview = previewValue || false;
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
            variables.id = previewData?.itemId || '';
        }
        const item = await provider.findOne(variables, locale, preview);
        if (!item || !item?.data) {
            const err = new Error('Article not found') as Error & { code: string };
            err.code = 'ENOENT';
            throw err;
        }
        return { item: item?.data || {} };
    };
}

export default ArticleDetailBlock;
