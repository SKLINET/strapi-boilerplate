import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import styles from './ArticlesListBlock.module.scss';
import { BaseBlockProps } from '../../types/block';
import { StaticBlockContext } from '@symbio/headless';
import { WebSettingsProps } from '../../types/webSettings';
import { Providers } from '../../types/providers';
import { Locale } from '../../types/locale';

graphql`
    fragment ArticlesListBlock_content on ComponentBlockArticlesListBlock {
        sectionId
    }
`;

function ArticlesListBlock({ data, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    return (
        <BlockWrapper className={styles.wrapper} {...rest}>
            {/* <NewsList items={articles} /> */}
        </BlockWrapper>
    );
}

if (typeof window === 'undefined') {
    ArticlesListBlock.getStaticProps = async ({
        locale,
        providers,
        context: { params },
    }: StaticBlockContext<any, WebSettingsProps, Providers, Locale>): Promise<any> => {
        const data = await providers.news.find({
            locale,
            slug: params?.slug,
        });
    };
}

ArticlesListBlock.whyDidYouRender = true;

export default ArticlesListBlock;
