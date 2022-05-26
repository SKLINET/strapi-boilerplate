import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import styles from './ArticleDetailBlock.module.scss';

import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { BaseBlockProps, StaticBlockContext } from '../../types/block';
import { fetchQuery } from 'react-relay';
import { articleDetailQuery } from '../../relay/__generated__/articleDetailQuery.graphql';
import { ArticleDetailQuery } from '../../relay/article';
import { createRelayEnvironment } from '../../utils/createRelayEnvironment';
import getPublicationState from '../../utils/getPublicationState';
import providers from '../../providers';
import { newsDetailQueryResponse } from '../../relay/__generated__/newsDetailQuery.graphql';

graphql`
    fragment ArticleDetailBlock_content on ComponentBlockArticleDetailBlock {
        sectionId
    }
`;

function ArticleDetailBlock({ blocksData, data }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    console.log(data);
    return (
        <BlockWrapper className={`flex-col ${styles.wrapper}`}>
            {/* {item && item.content && (
                <NewsDetail
                    item={{
                        ...item,
                        dateFrom: String(item.dateFrom),
                        title: String(item.title),
                        slug: String(item.slug),
                        content: item.content as never,
                    }}
                    app={app}
                    className={className}
                />
            )} */}
        </BlockWrapper>
    );
}

if (typeof window === 'undefined') {
    ArticleDetailBlock.getStaticProps = async ({ slug }: StaticBlockContext): Promise<BaseBlockProps> => {
        const item = (await providers.articles.findOne({})) as newsDetailQueryResponse['item'];
        return {
            data: {
                article: item,
            },
        };
    };
}

ArticleDetailBlock.whyDidYouRender = true;

export default ArticleDetailBlock;
