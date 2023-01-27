import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import styles from './ArticleDetailBlock.module.scss';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { getSlug } from '@symbio/headless/utils';
import { BaseBlockProps, StaticBlockContext } from '../../types/block';
import { NewsDetail } from '../../components/blocks/NewsDetail/NewsDetail';
import { AppContextProps, OmitRefType } from '@symbio/headless';
import { ArticleDetailBlock_content } from './__generated__/ArticleDetailBlock_content.graphql';
import { PageProps } from '../../types/page';
import { WebSettingsProps } from '../../types/webSettings';
import { ISystemResources } from '../../types/systemResources';
import { newsPreviewQuery } from '../../relay/news';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ArticleDetailBlockStaticProps {
    item: any;
}

export interface ArticleDetailBlockContent extends OmitRefType<ArticleDetailBlock_content> {
    __typename: 'ComponentBlockArticleDetailBlock';
}

export interface ArticleDetailBlockProps extends ArticleDetailBlockStaticProps {
    blocksData: ArticleDetailBlockContent;
    app?: AppContextProps<PageProps, WebSettingsProps> & ISystemResources;
}

graphql`
    fragment ArticleDetailBlock_content on ComponentBlockArticleDetailBlock {
        id
        sectionId
    }
`;

const ArticleDetailBlock = ({ blocksData, app, item }: ArticleDetailBlockProps): ReactElement => {
    return (
        <BlockWrapper className={`flex-col ${styles.wrapper}`}>
            {item.attributes && item.attributes.content && (
                <NewsDetail
                    item={{
                        ...item.attributes,
                        dateFrom: String(item.attributes.date),
                        title: String(item.attributes.title),
                        slug: String(item.attributes.url),
                        content: item.attributes.content as never,
                    }}
                    app={app}
                />
            )}
        </BlockWrapper>
    );
};

if (typeof window === 'undefined') {
    ArticleDetailBlock.getStaticProps = async ({
        locale,
        providers,
        context: { params, preview, previewData },
        block,
    }: StaticBlockContext): Promise<BaseBlockProps> => {
        if (!params || !params.slug || block?.__typename !== 'ComponentBlockArticleDetailBlock') {
            const err = new Error('Page not found') as Error & { code: string };
            err.code = 'ENOENT';
            throw err;
        }
        const slug = getSlug(params.slug);
        if (!slug) {
            const err = new Error('Page not found') as Error & { code: string };
            err.code = 'ENOENT';
            throw err;
        }
        const provider = providers.news;
        const variables: Record<string, unknown> = {
            locale,
            preview,
            slug: slug,
        };
        if (previewData?.itemId && slug === previewData?.itemSlug) {
            provider.setFindOneQuery(newsPreviewQuery);
            variables.id = previewData?.itemId || '';
        }
        const item = await provider.findOne(variables);
        if (!item) {
            const err = new Error('Article not found') as Error & { code: string };
            err.code = 'ENOENT';
            throw err;
        }
        return { item: item?.data || {} };
    };
}

ArticleDetailBlock.whyDidYouRender = true;

export default ArticleDetailBlock;
