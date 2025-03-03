import React, { ReactElement } from 'react';
import { graphql } from 'relay-runtime';
import { BaseBlockProps, StaticBlockContext } from '../../../types/base/block';
import { ArticleDetailBlock_content$data } from './__generated__/ArticleDetailBlock_content.graphql';
import { IApp } from '../../../types/base/app';
import { articleDetailFragment$data } from '../../../relay/__generated__/articleDetailFragment.graphql';
import { ArticleDetail } from '../../components/blocks/ArticleDetail/ArticleDetail';
import getPublicationState from '../../../utils/base/getPublicationState';
import { getSlug } from '../../../utils/base/getSlug';

export interface ArticleDetailBlockStaticProps {
    item: Omit<articleDetailFragment$data, ' $fragmentType'>;
}

export interface ArticleDetailBlockContent extends Omit<ArticleDetailBlock_content$data, ' $fragmentType'> {
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

const ArticleDetailBlock = (props: ArticleDetailBlockProps): ReactElement => <ArticleDetail {...props} />;

if (typeof window === 'undefined') {
    ArticleDetailBlock.getStaticProps = async ({
        locale,
        providers,
        context: { params, preview: previewValue },
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
            status: getPublicationState(preview),
        };

        const item = await provider.findOne(variables, locale, preview);
        if (!item?.documentId) {
            const err = new Error('Article not found') as Error & { code: string };
            err.code = 'ENOENT';
            throw err;
        }
        return { item: item || {} };
    };
}

export default ArticleDetailBlock;
