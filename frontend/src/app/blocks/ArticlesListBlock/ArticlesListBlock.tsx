import React, { ReactElement } from 'react';
import { graphql } from 'relay-runtime';
import { StaticBlockContext } from '../../../types/base/block';
import getPublicationState from '../../../utils/base/getPublicationState';
import { ArticlesListBlock_content$data } from './__generated__/ArticlesListBlock_content.graphql';
import { IApp } from '../../../types/base/app';
import { ArticleList } from '../../components/blocks/ArticleList/ArticleList';
import { articleFragment$data } from '../../../relay/__generated__/articleFragment.graphql';
import { articleCategoryFragment$data } from '../../../relay/__generated__/articleCategoryFragment.graphql';

export interface ArticlesListBlockStaticProps {
    data: {
        articles: Omit<articleFragment$data, ' $fragmentType'>[];
        categories: Omit<articleCategoryFragment$data, ' $fragmentType'>[];
        canLoadMore: boolean;
    };
}

export interface ArticlesListBlockContent extends Omit<ArticlesListBlock_content$data, ' $fragmentType'> {
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

const ArticlesListBlock = (props: ArticlesListBlockProps): ReactElement => <ArticleList {...props} />;

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

        const filters: Record<string, any> = {};

        if (typeof searchParams?.filter === 'string') {
            filters.category = { documentId: { eq: searchParams.filter } };
        }

        const articles = await providers.article.find({
            locale,
            filters: filters,
            limit: limit,
            preview,
            status: publicationState,
        });

        const categories = await providers.articleCategory.find({
            locale,
            preview,
            status: publicationState,
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
