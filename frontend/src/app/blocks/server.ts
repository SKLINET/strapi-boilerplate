/**
 * Import blocks which should be included in SSR
 */
import { BlockType } from '@symbio/headless';
import { PageProps } from '../../types/page';
import { WebSettingsProps } from '../../types/webSettings';
import { Providers } from '../../types/providers';
import { Locale } from '../../types/locale';

/**
 * Define fragment for blocks to load with app data
 */
import { graphql } from 'relay-runtime';

import ArticleDetailBlock from './ArticleDetailBlock/ArticleDetailBlock';
import ArticlesListBlock from './ArticlesListBlock/ArticlesListBlock';
import TemplateBlock from './TemplateBlock/TemplateBlock';
import VideoBlock from './VideoBlock/VideoBlock';

graphql`
    fragment serverBlocksContent on PageBlocksDynamicZone {
        __typename
        ...ArticleDetailBlock_content @relay(mask: false)
        ...ArticlesListBlock_content @relay(mask: false)
        ...TemplateBlock_content @relay(mask: false)
        ...VideoBlock_content @relay(mask: false)
    }
`;
const blocks: { [name: string]: BlockType<PageProps, WebSettingsProps, Providers, Locale> } = {
    ArticleDetailBlock,
    ArticlesListBlock,
    TemplateBlock,
    VideoBlock,
};

export default blocks;
