import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { StaticBlockContext } from '@symbio/headless';
import { Providers } from '../../types/providers';
import { Locale } from '../../types/locale';
import getPublicationState from '../../utils/getPublicationState';
import { OmitRefType } from '@symbio/headless';
import { ArticlesListBlock_content$data } from './__generated__/ArticlesListBlock_content.graphql';
import { WebSettingsProps } from '../../types/webSettings';
import { IApp } from '../../types/app';
import { articleListQuery$data } from '../../relay/__generated__/articleListQuery.graphql';
import { ArticleList } from '../../components/blocks/ArticleList/ArticleList';

export interface ArticlesListBlockStaticProps {
    data: NonNullable<articleListQuery$data['items']>['data'];
}

export interface ArticlesListBlockContent extends OmitRefType<ArticlesListBlock_content$data> {
    __typename: 'ComponentBlockArticlesListBlock';
}

export interface ArticlesListBlockProps extends ArticlesListBlockStaticProps {
    blocksData: Omit<ArticlesListBlockContent, ' $fragmentType'>;
    app?: IApp;
    className?: string;
}

graphql`
    fragment ArticlesListBlock_content on ComponentBlockArticlesListBlock {
        id
    }
`;

const ArticlesListBlock = ({ blocksData, app, data }: ArticlesListBlockProps): ReactElement => (
    <ArticleList blocksData={blocksData} app={app} data={data} />
);

if (typeof window === 'undefined') {
    ArticlesListBlock.getStaticProps = async ({
        locale,
        providers,
        context: { params, preview },
        block,
    }: StaticBlockContext<any, WebSettingsProps, Providers, Locale>): Promise<any> => {
        if (block?.__typename !== 'ComponentBlockArticlesListBlock') {
            const err = new Error('Page not found') as Error & { code: string };
            err.code = 'ENOENT';
            throw err;
        }

        const publicationState = getPublicationState(preview);
        const data = await providers.article.find({
            locale,
            slug: params?.slug,
            publicationState: publicationState,
        });
        return data;
    };
}

ArticlesListBlock.whyDidYouRender = true;

export default ArticlesListBlock;
