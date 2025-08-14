import React, { ReactElement } from 'react';
import { graphql } from 'relay-runtime';
import { StaticBlockContext } from '../../../types/base/block';
import { ArticlesListBlock_content$data } from './__generated__/ArticlesListBlock_content.graphql';
import { IApp } from '../../../types/base/app';
import { ArticleList } from '../../components/blocks/ArticleList/ArticleList';
import { fetchArticles } from '../../actions/fetch-articles';
import config from '../../../../sklinet.config.json';
import { fetchArticleCategories } from '../../actions/fetch-article-categories';
import { IArticle, IArticleCategory } from '../../../types/article';

export interface ArticlesListBlockStaticProps {
    data: {
        articles: IArticle[];
        categories: IArticleCategory[];
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
        context: { preview, searchParams },
        block,
        settings,
    }: StaticBlockContext): Promise<any> => {
        if (block?.__typename !== 'ComponentBlockArticlesListBlock') {
            const err = new Error('Page not found') as Error & { code: string };
            err.code = 'ENOENT';
            throw err;
        }

        const limit = block?.countOnPage || 5;

        const categoryId = typeof searchParams?.filter === 'string' ? searchParams.filter : undefined;

        const { articles, canLoadMore } = await fetchArticles(
            { limit: limit, categoryId: categoryId },
            {
                webSetting: settings,
                locale: locale || config.i18n.defaultLocale,
                preview,
            },
        );

        const { categories } = await fetchArticleCategories(
            {},
            {
                locale: locale || config.i18n.defaultLocale,
                preview,
            },
        );

        return {
            data: {
                articles: articles,
                categories: categories,
                canLoadMore: canLoadMore,
            },
        };
    };
}

export default ArticlesListBlock;
