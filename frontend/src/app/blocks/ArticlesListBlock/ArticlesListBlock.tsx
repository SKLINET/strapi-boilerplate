import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { StaticBlockContext } from '../../../types/base/block';
import getPublicationState from '../../../utils/base/getPublicationState';
import { OmitRefType } from '@symbio/headless';
import { ArticlesListBlock_content$data } from './__generated__/ArticlesListBlock_content.graphql';
import { IApp } from '../../../types/base/app';
import { articleListQuery$data } from '../../../relay/__generated__/articleListQuery.graphql';
import { ArticleList } from '../../components/blocks/ArticleList/ArticleList';
import { getItemId } from '../../../utils/getItemId';
import { articleCategoryListQuery$data } from '../../../relay/__generated__/articleCategoryListQuery.graphql';

export interface ArticlesListBlockStaticProps {
    data: {
        articles: NonNullable<articleListQuery$data['items']>['data'] | null;
        categories: NonNullable<articleCategoryListQuery$data['items']>['data'] | null;
        canLoadMore: boolean;
    };
}

export interface ArticlesListBlockContent extends OmitRefType<ArticlesListBlock_content$data> {
    __typename: 'ComponentBlockArticlesListBlock';
}

export interface ArticlesListBlockProps extends ArticlesListBlockStaticProps {
    blocksData: Omit<ArticlesListBlockContent, ' $fragmentType'>;
    app: IApp;
    className?: string;
}

graphql`
    fragment ArticlesListBlock_content on ComponentBlockArticlesListBlock {
        id
        countOnPage
    }
`;

const ArticlesListBlock = (data: ArticlesListBlockProps): ReactElement => <ArticleList {...data} />;

if (typeof window === 'undefined') {
    ArticlesListBlock.getStaticProps = async ({
        locale,
        providers,
        context: { preview, searchParams },
        block,
    }: StaticBlockContext): Promise<any> => {
        if (block?.__typename !== 'ComponentBlockArticlesListBlock') {
            const err = new Error('Page not found') as Error & { code: string };
            err.code = 'ENOENT';
            throw err;
        }

        const publicationState = getPublicationState(preview);

        const limit = block?.countOnPage || 5;

        const filter: Record<string, any> = {};

        if (typeof searchParams?.filter === 'string') {
            filter.category = { id: { eq: getItemId(searchParams.filter) } };
        }

        const articles = await providers.article.find({
            locale,
            filter: filter,
            limit: limit,
            preview,
            publicationState: publicationState,
        });

        const categories = await providers.articleCategory.find({
            locale,
            preview,
            publicationState: publicationState,
        });

        return {
            data: {
                articles: articles?.data || [],
                categories: categories?.data || [],
                canLoadMore: articles?.count > limit,
            },
        };
    };
}

export default ArticlesListBlock;
