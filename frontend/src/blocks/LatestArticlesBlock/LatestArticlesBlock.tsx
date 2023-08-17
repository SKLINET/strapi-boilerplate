import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { BaseBlockProps, StaticBlockContext } from '../../types/block';
import { getSlug } from '@symbio/headless/utils';
import getPublicationState from '../../utils/getPublicationState';
import { OmitRefType } from '@symbio/headless';
import { LatestArticlesBlock_content$data } from './__generated__/LatestArticlesBlock_content.graphql';
import { IApp } from '../../types/app';
import { articleListQuery$data } from '../../relay/__generated__/articleListQuery.graphql';
import { LatestArticles } from '../../components/blocks/LatestArticles/LatestArticles';

export interface LatestArticlesBlockStaticProps {
    data: NonNullable<articleListQuery$data['items']>['data'];
}

export interface LatestArticlesBlockContent extends OmitRefType<LatestArticlesBlock_content$data> {
    __typename: 'ComponentBlockLatestArticlesBlock';
}

export interface LatestArticlesBlockProps extends LatestArticlesBlockStaticProps {
    blocksData: Omit<LatestArticlesBlockContent, ' $fragmentType'>;
    app?: IApp;
    className?: string;
}

graphql`
    fragment LatestArticlesBlock_content on ComponentBlockLatestArticlesBlock {
        id
    }
`;

const LatestArticlesBlock = ({ blocksData, app, data }: LatestArticlesBlockProps): ReactElement => (
    <LatestArticles blocksData={blocksData} app={app} data={data} />
);

if (typeof window === 'undefined') {
    LatestArticlesBlock.getStaticProps = async ({
        locale,
        providers,
        context: { params, preview },
        block,
    }: StaticBlockContext): Promise<BaseBlockProps> => {
        if (block?.__typename !== 'ComponentBlockLatestArticlesBlock') {
            const err = new Error('Page not found') as Error & { code: string };
            err.code = 'ENOENT';
            throw err;
        }

        const slug = getSlug(params.slug);
        const filter = { slug: { ne: slug } };
        const publicationState = getPublicationState(preview);
        const data = await providers.article.find({
            locale,
            limit: 3,
            offset: 0,
            filter,
            publicationState,
        });

        return data;
    };
}

LatestArticlesBlock.whyDidYouRender = true;

export default LatestArticlesBlock;
