/**
 * Import blocks which should be included in SSR
 */
import { BlockType } from '@symbio/headless';
import { PageProps } from '../types/page';
import { WebSettingsProps } from '../types/webSettings';
import { Providers } from '../types/providers';
import { Locale } from '../types/locale';

import ButtonBlock from './ButtonBlock/ButtonBlock';
import CarouselBlock from './CarouselBlock/CarouselBlock';
import ErrorPageBlock from './ErrorPageBlock/ErrorPageBlock';
import GalleryBlock from './GalleryBlock/GalleryBlock';
import ImageBlock from './ImageBlock/ImageBlock';
import MapBlock from './MapBlock/MapBlock';
import ArticleDetailBlock from './ArticleDetailBlock/ArticleDetailBlock';
import ArticlesListBlock from './ArticlesListBlock/ArticlesListBlock';
import RichTextBlock from './RichTextBlock/RichTextBlock';
import VideoBlock from './VideoBlock/VideoBlock';
import YoutubeVimeoBlock from './YoutubeVimeoBlock/YoutubeVimeoBlock';

/**
 * Define fragment for blocks to load with app data
 */
import { graphql } from 'relay-runtime';

graphql`
    fragment serverBlocksContent on PageBlocksDynamicZone {
        __typename
        ...ButtonBlock_content @relay(mask: false)
        ...CarouselBlock_content @relay(mask: false)
        ...ErrorPageBlock_content @relay(mask: false)
        ...GalleryBlock_content @relay(mask: false)
        ...ImageBlock_content @relay(mask: false)
        ...MapBlock_content @relay(mask: false)
        ...RichTextBlock_content @relay(mask: false)
        ...VideoBlock_content @relay(mask: false)
        ...YoutubeVimeoBlock_content @relay(mask: false)
    }
`;

const blocks: { [name: string]: BlockType<PageProps, WebSettingsProps, Providers, Locale> } = {
    ButtonBlock,
    CarouselBlock,
    ErrorPageBlock,
    GalleryBlock,
    ImageBlock,
    MapBlock,
    ArticleDetailBlock,
    ArticlesListBlock,
    RichTextBlock,
    VideoBlock,
    YoutubeVimeoBlock,
};

export default blocks;
