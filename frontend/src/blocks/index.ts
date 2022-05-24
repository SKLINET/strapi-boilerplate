/**
 * Import blocks which should be included in SSR
 */
import dynamic from 'next/dynamic';

/**
 * Define fragment for blocks to load with app data
 */
import { graphql } from 'relay-runtime';
import ButtonBlock from './ButtonBlock/ButtonBlock';
import CarouselBlock from './CarouselBlock/CarouselBlock';
import ErrorPageBlock from './ErrorPageBlock/ErrorPageBlock';
import GalleryBlock from './GalleryBlock/GalleryBlock';
import ImageBlock from './ImageBlock/ImageBlock';
import MapBlock from './MapBlock/MapBlock';
import ArticleDetailBlock from './ArticleDetailBlock/ArticleDetailBlock';
import ArticlesListBlock from './ArticlesListBlock/ArticlesListBlock';
import LatestArticlesBlock from './LatestArticlesBlock/LatestArticlesBlock';
import RichTextBlock from './RichTextBlock/RichTextBlock';
import VideoBlock from './VideoBlock/VideoBlock';
import YoutubeVimeoBlock from './YoutubeVimeoBlock/YoutubeVimeoBlock';

graphql`
    fragment blocksContent on PageBlocksDynamicZone {
        __typename
        ...ButtonBlock_content @relay(mask: false)
        ...CarouselBlock_content @relay(mask: false)
        ...ErrorPageBlock_content @relay(mask: false)
        ...GalleryBlock_content @relay(mask: false)
        ...ImageBlock_content @relay(mask: false)
        ...MapBlock_content @relay(mask: false)
        ...ArticleDetailBlock_content @relay(mask: false)
        ...ArticlesListBlock_content @relay(mask: false)
        ...LatestArticlesBlock_content @relay(mask: false)
        ...RichTextBlock_content @relay(mask: false)
        ...VideoBlock_content @relay(mask: false)
        ...YoutubeVimeoBlock_content @relay(mask: false)
    }
`;

const blocks: { [name: string]: any } =
    process.env.NODE_ENV === 'production'
        ? {
              ButtonBlock: dynamic(() => import('./ButtonBlock/ButtonBlock')),
              CarouselBlock: dynamic(() => import('./CarouselBlock/CarouselBlock')),
              ErrorPageBlock: dynamic(() => import('./ErrorPageBlock/ErrorPageBlock')),
              GalleryBlock: dynamic(() => import('./GalleryBlock/GalleryBlock')),
              ImageBlock: dynamic(() => import('./ImageBlock/ImageBlock')),
              MapBlock: dynamic(() => import('./MapBlock/MapBlock')),
              ArticleDetailBlock: dynamic(() => import('./ArticleDetailBlock/ArticleDetailBlock')),
              ArticlesListBlock: dynamic(() => import('./ArticlesListBlock/ArticlesListBlock')),
              LatestArticlesBlock: dynamic(() => import('./LatestArticlesBlock/LatestArticlesBlock')),
              RichTextBlock: dynamic(() => import('./RichTextBlock/RichTextBlock')),
              VideoBlock: dynamic(() => import('./VideoBlock/VideoBlock')),
              YoutubeVimeoBlock: dynamic(() => import('./YoutubeVimeoBlock/YoutubeVimeoBlock')),
          }
        : {
              ButtonBlock,
              CarouselBlock,
              ErrorPageBlock,
              GalleryBlock,
              ImageBlock,
              MapBlock,
              ArticleDetailBlock,
              ArticlesListBlock,
              LatestArticlesBlock,
              RichTextBlock,
              VideoBlock,
              YoutubeVimeoBlock,
          };

export default blocks;
