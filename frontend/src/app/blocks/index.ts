import { graphql } from 'relay-runtime';
import { BlockType } from '@symbio/headless';
import { PageProps } from '../../types/base/page';
import { WebSettingsProps } from '../../types/base/webSettings';
import { Providers } from '../../types/base/providers';
import { Locale } from '../../types/base/locale';

import ArticleDetailBlock from './ArticleDetailBlock/ArticleDetailBlock';
import ArticlesListBlock from './ArticlesListBlock/ArticlesListBlock';
import ContactFormBlock from './ContactFormBlock/ContactFormBlock';
import TemplateBlock from './TemplateBlock/TemplateBlock';
import VideoBlock from './VideoBlock/VideoBlock';

graphql`
    fragment blocksContent on PageBlocksDynamicZone {
        __typename
        ...ArticleDetailBlock_content @relay(mask: false)
        ...ArticlesListBlock_content @relay(mask: false)
        ...ContactFormBlock_content @relay(mask: false)
        ...TemplateBlock_content @relay(mask: false)
        ...VideoBlock_content @relay(mask: false)
    }
`;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const blocks: { [name: string]: BlockType<PageProps, WebSettingsProps, Providers, Locale> } = {
    ArticleDetailBlock,
    ArticlesListBlock,
    ContactFormBlock,
    TemplateBlock,
    VideoBlock,
};

export default blocks;
