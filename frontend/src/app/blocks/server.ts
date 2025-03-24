import { graphql } from 'relay-runtime';

import ArticleDetailBlock from './ArticleDetailBlock/ArticleDetailBlock';
import ArticlesListBlock from './ArticlesListBlock/ArticlesListBlock';
import ContactFormBlock from './ContactFormBlock/ContactFormBlock';
import TemplateBlock from './TemplateBlock/TemplateBlock';
import VideoBlock from './VideoBlock/VideoBlock';

graphql`
    fragment serverBlocksContent on PageBlocksDynamicZone {
        __typename
        ...ArticleDetailBlock_content @relay(mask: false)
        ...ArticlesListBlock_content @relay(mask: false)
        ...ContactFormBlock_content @relay(mask: false)
        ...TemplateBlock_content @relay(mask: false)
        ...VideoBlock_content @relay(mask: false)
    }
`;

const blocks = {
    ArticleDetailBlock,
    ArticlesListBlock,
    ContactFormBlock,
    TemplateBlock,
    VideoBlock,
};

export default blocks;
