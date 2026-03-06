import { ReactElement, Suspense } from 'react';
import { graphql } from 'relay-runtime';
import { ArticlesListBlock_content$data } from './__generated__/ArticlesListBlock_content.graphql';
import { IApp } from '../../../types/base/app';
import { ArticlesListBlockLoading } from './Loading';
import { SearchParamsProps } from '../../../types/base/page';
import { ArticlesListBlockServer } from './Server';

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

export default ArticlesListBlock;
