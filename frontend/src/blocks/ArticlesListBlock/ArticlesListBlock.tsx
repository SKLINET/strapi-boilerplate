import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import styles from './ArticlesListBlock.module.scss';
import { BaseBlockProps } from '../../types/block';
import { StaticBlockContext } from '@symbio/headless';
import { WebSettingsProps } from '../../types/webSettings';
import { Providers } from '../../types/providers';
import { Locale } from '../../types/locale';
import { NewsList } from '../../components/blocks/NewsList/NewsList';

graphql`
    fragment ArticlesListBlock_content on ComponentBlockArticlesListBlock {
        id
        sectionId
    }
`;

function ArticlesListBlock({ blocksData, data, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    const articles = data || [];
    return (
        <BlockWrapper className={styles.wrapper} {...rest}>
            <NewsList items={articles} />
        </BlockWrapper>
    );
}

if (typeof window === 'undefined') {
    ArticlesListBlock.getStaticProps = async ({
        locale,
        providers,
        context: { params },
    }: StaticBlockContext<any, WebSettingsProps, Providers, Locale>): Promise<any> => {
        console.log('list block working');
        const data = await providers.news.find({
            locale,
            slug: params?.slug,
        });
        console.log(data);
        return data;
    };
}

ArticlesListBlock.whyDidYouRender = true;

export default ArticlesListBlock;
