import { ReactElement, Suspense } from 'react';
import { graphql } from 'relay-runtime';
import { ArticlesListBlock_content$data } from './__generated__/ArticlesListBlock_content.graphql';
import { IApp } from '../../../types/base/app';
import { ArticlesListBlockLoading } from './Loading';
import { SearchParamsProps } from '../../../types/base/page';
import { ArticlesListBlockServer } from './Server';
// import { cacheTag } from '../../../utils/cache/tag';

export interface ArticlesListBlockStaticProps {}

export interface ArticlesListBlockContent extends Omit<ArticlesListBlock_content$data, ' $fragmentType'> {
    __typename: 'ComponentBlockArticlesListBlock';
}

export interface ArticlesListBlockProps extends ArticlesListBlockStaticProps {
    blocksData: Omit<ArticlesListBlockContent, ' $fragmentType'>;
    app: IApp;
    className?: string;
    searchParams?: Promise<SearchParamsProps> | undefined;
}

graphql`
    fragment ArticlesListBlock_content on ComponentBlockArticlesListBlock {
        id
        countOnPage
        anchor
    }
`;

const ArticlesListBlock = async (props: ArticlesListBlockProps): Promise<ReactElement> => (
    <Suspense fallback={<ArticlesListBlockLoading />}>
        <ArticlesListBlockServer {...props} />
    </Suspense>
);

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
