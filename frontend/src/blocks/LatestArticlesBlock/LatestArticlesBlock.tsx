import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { NewsList } from '../../components/blocks/NewsList/NewsList';
import { BaseBlockProps, StaticBlockContext } from '../../types/block';
import { getPageUrl } from '../../utils/getPageUrl';
import { formatPageObject } from '../../utils/formatPageObject';
import { getSlug } from '@symbio/headless/utils';
import getPublicationState from '../../utils/getPublicationState';

graphql`
    fragment LatestArticlesBlock_content on ComponentBlockLatestArticlesBlock {
        id
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
                allNewsUrl={getPageUrl(formatPageObject(allNewsUrl || ''))}
                detailUrl={getPageUrl(formatPageObject(detailUrl || ''))}
            />
        </BlockWrapper>
    );
}

if (typeof window === 'undefined') {
    LatestArticlesBlock.getStaticProps = async ({
        locale,
        providers,
        context: { params, preview },
    }: StaticBlockContext): Promise<BaseBlockProps> => {
        const slug = getSlug(params.slug);
        const filter = { slug: { ne: slug } };
        const publicationState = getPublicationState(preview);
        return await providers.news.find({
            locale,
            limit: 3,
            offset: 0,
            filter,
            publicationState,
        });
    };
}

LatestArticlesBlock.whyDidYouRender = true;

export default LatestArticlesBlock;
