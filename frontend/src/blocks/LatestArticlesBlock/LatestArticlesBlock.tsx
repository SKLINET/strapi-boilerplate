import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { NewsList } from '../../components/blocks/NewsList/NewsList';
import { BaseBlockProps, StaticBlockContext } from '../../types/block';
import { createRelayEnvironment } from '../../utils/createRelayEnvironment';
import { fetchQuery } from 'react-relay';
import getPublicationState from '../../utils/getPublicationState';
import { latestArticlesQuery } from '../../relay/__generated__/latestArticlesQuery.graphql';
import { LatestArticlesQuery } from '../../relay/latestArticles';

graphql`
    fragment LatestArticlesBlock_content on ComponentBlockLatestArticlesBlock {
        buttonLabel
        heading
    }
`;

function LatestArticlesBlock({ blocksData, data, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    const articlesData = data;

    return (
        <BlockWrapper {...rest}>
            <NewsList headline={blocksData?.heading} items={articlesData} allNewsLinkText={blocksData?.buttonLabel} />
        </BlockWrapper>
    );
}

if (typeof window === 'undefined') {
    LatestArticlesBlock.getStaticProps = async ({ locale }: StaticBlockContext): Promise<BaseBlockProps> => {
        const environment = createRelayEnvironment({});
        const currentDate = new Date();
        const timestamp = currentDate.toISOString();
        const articlesData = await fetchQuery<latestArticlesQuery>(environment, LatestArticlesQuery, {
            filters: { publishDate: { lte: timestamp } },
            start: 0,
            limit: 3,
            publicationState: getPublicationState(),
            locale,
        }).toPromise();

        return {
            data: articlesData?.articles || [],
        };
    };
}

LatestArticlesBlock.whyDidYouRender = true;

export default LatestArticlesBlock;
