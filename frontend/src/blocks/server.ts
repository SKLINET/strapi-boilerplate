/**
 * Import blocks which should be included in SSR
 */
import { BlockType } from '@symbio/headless';
import { PageProps } from '../types/page';
import { WebSettingsProps } from '../types/webSettings';
import { Providers } from '../types/providers';
import { Locale } from '../types/locale';
import ArticleDetailBlock from './ArticleDetailBlock/ArticleDetailBlock';
import ArticlesListBlock from './ArticlesListBlock/ArticlesListBlock';
import ButtonBlock from './ButtonBlock/ButtonBlock';
import CarouselBlock from './CarouselBlock/CarouselBlock';
import ErrorPageBlock from './ErrorPageBlock/ErrorPageBlock';
import GalleryBlock from './GalleryBlock/GalleryBlock';
import ImageBlock from './ImageBlock/ImageBlock';
import LatestArticlesBlock from './LatestArticlesBlock/LatestArticlesBlock';
import MapBlock from './MapBlock/MapBlock';
import RichTextBlock from './RichTextBlock/RichTextBlock';
import TestBlock from './TestBlock/TestBlock';
import VideoBlock from './VideoBlock/VideoBlock';
import YoutubeVimeoBlock from './YoutubeVimeoBlock/YoutubeVimeoBlock';
/**
 * Define fragment for blocks to load with app data
 */
import { graphql } from 'relay-runtime';
graphql`
    fragment serverBlocksContent on PageBlocksDynamicZone {
        __typename
    }
`;
const blocks: { [name: string]: BlockType<PageProps, WebSettingsProps, Providers, Locale> } = {
    ArticleDetailBlock,
    ArticlesListBlock,
    ButtonBlock,
    CarouselBlock,
    ErrorPageBlock,
    GalleryBlock,
    ImageBlock,
    LatestArticlesBlock,
    MapBlock,
    RichTextBlock,
    TestBlock,
    VideoBlock,
    YoutubeVimeoBlock,
};
export default blocks;
