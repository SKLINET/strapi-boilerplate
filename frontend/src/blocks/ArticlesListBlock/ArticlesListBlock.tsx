import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import styles from './ArticlesListBlock.module.scss';
import { NewsList } from '../../components/blocks/NewsList/NewsList';
import { BaseBlockProps, StaticBlockContext } from '../../types/block';
import { createRelayEnvironment } from '../../utils/createRelayEnvironment';
import { fetchQuery } from 'react-relay';
import { articleListQuery } from '../../relay/__generated__/articleListQuery.graphql';
import { ArticleListQuery } from '../../relay/article';
import getPublicationState from '../../utils/getPublicationState';

graphql`
    fragment ArticlesListBlock_content on ComponentBlockArticlesListBlock {
        sectionId
    }
`;

function ArticlesListBlock({ data, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    const articles = data?.articlesData?.data;

    return (
        <BlockWrapper className={styles.wrapper} {...rest}>
            <NewsList items={articles} />
        </BlockWrapper>
    );
}

if (typeof window === 'undefined') {
    ArticlesListBlock.getStaticProps = async ({ locale }: StaticBlockContext): Promise<BaseBlockProps> => {
        const environment = createRelayEnvironment({});
        const currentDate = new Date();
        const timestamp = currentDate.toISOString();
        const articlesData = await fetchQuery<articleListQuery>(environment, ArticleListQuery, {
            filters: { publishDate: { lte: timestamp } },
            start: 0,
            limit: -1,
            publicationState: getPublicationState(),
            locale,
        }).toPromise();

        return {
            data: {
                articlesData: articlesData?.articles || [],
            },
        };
    };
}

ArticlesListBlock.whyDidYouRender = true;

export default ArticlesListBlock;
