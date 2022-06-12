import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { NewsList } from '../../components/blocks/NewsList/NewsList';
import { BaseBlockProps, StaticBlockContext } from '../../types/block';
import { getPageUrl } from '../../utils/getPageUrl';

graphql`
    fragment LatestArticlesBlock_content on ComponentBlockLatestArticlesBlock {
        buttonLabel
        heading
    }
`;

function LatestArticlesBlock({ blocksData, data, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    const articlesData = data;
    const allNewsUrl = rest?.app?.webSetting?.data?.attributes?.articlesPage?.data?.attributes?.url || '';
    const detailUrl = rest?.app?.webSetting?.data?.attributes?.articleDetailPage?.data?.attributes?.url || '';
    return (
        <BlockWrapper {...rest}>
            <NewsList
                headline={blocksData?.heading}
                items={articlesData}
                allNewsLinkText={blocksData?.buttonLabel}
                allNewsUrl={getPageUrl(allNewsUrl || '')}
                detailUrl={getPageUrl(detailUrl || '')}
            />
        </BlockWrapper>
    );
}

if (typeof window === 'undefined') {
    // LatestArticlesBlock.getStaticProps = async ({ locale, providers }: StaticBlockContext): Promise<BaseBlockProps> => {
    //     return await providers.articles.find({
    //         locale,
    //         limit: 3,
    //         offset: 0,
    //     });
    // };
}

LatestArticlesBlock.whyDidYouRender = true;

export default LatestArticlesBlock;
