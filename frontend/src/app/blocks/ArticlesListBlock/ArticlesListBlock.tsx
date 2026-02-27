import { ReactElement } from 'react';
import { graphql } from 'relay-runtime';
import { ArticlesListBlock_content$data } from './__generated__/ArticlesListBlock_content.graphql';
import { IApp } from '../../../types/base/app';
import { ArticleList } from '../../components/blocks/ArticleList/ArticleList';
import { fetchArticles } from '../../actions/fetch-articles';
import { fetchArticleCategories } from '../../actions/fetch-article-categories';
import { IArticle, IArticleCategory } from '../../../types/article';
import { cacheTag } from '../../../utils/cache/tag';

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
        anchor
    }
`;

const ArticlesListBlock = async (props: ArticlesListBlockProps): Promise<ReactElement> => {
    cacheTag('article');
    cacheTag('article-category');

    const { articles, canLoadMore } = await fetchArticles(
        { limit: 1 },
        {
            webSetting: props.app?.webSetting,
            locale: props.app?.locale,
            preview: props.app?.preview,
        },
    );

    const { categories } = await fetchArticleCategories(
        {},
        {
            locale: props.app?.locale,
            preview: props.app?.preview,
        },
    );

    return <ArticleList {...props} data={{ articles, categories, canLoadMore }} />;
};

/*
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
*/

export default ArticlesListBlock;
