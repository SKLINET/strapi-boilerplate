/**
 * Import blocks which should be included in SSR
 */
import dynamic from 'next/dynamic';
import { BlockType } from '@symbio/headless';
import { PageProps } from '../types/page';
import { WebSettingsProps } from '../types/webSettings';
import { Providers } from '../types/providers';
import { Locale } from '../types/locale';

/**
 * Define fragment for blocks to load with app data
 */
import { graphql } from 'relay-runtime';

import ArticleDetailBlock from './ArticleDetailBlock/ArticleDetailBlock';
import ArticlesListBlock from './ArticlesListBlock/ArticlesListBlock';
import ButtonBlock from './ButtonBlock/ButtonBlock';
import CarouselBlock from './CarouselBlock/CarouselBlock';
import ErrorBlock from './ErrorBlock/ErrorBlock';
import GalleryBlock from './GalleryBlock/GalleryBlock';
import ImageBlock from './ImageBlock/ImageBlock';
import LatestArticlesBlock from './LatestArticlesBlock/LatestArticlesBlock';
import MapBlock from './MapBlock/MapBlock';
import RichTextBlock from './RichTextBlock/RichTextBlock';
import TemplateBlock from './TemplateBlock/TemplateBlock';
import VideoBlock from './VideoBlock/VideoBlock';

graphql`
    fragment blocksContent on PageBlocksDynamicZone {
        __typename
        ...ArticleDetailBlock_content @relay(mask: false)
        ...ArticlesListBlock_content @relay(mask: false)
        ...ButtonBlock_content @relay(mask: false)
        ...CarouselBlock_content @relay(mask: false)
        ...ErrorBlock_content @relay(mask: false)
        ...GalleryBlock_content @relay(mask: false)
        ...ImageBlock_content @relay(mask: false)
        ...LatestArticlesBlock_content @relay(mask: false)
        ...MapBlock_content @relay(mask: false)
        ...RichTextBlock_content @relay(mask: false)
        ...TemplateBlock_content @relay(mask: false)
        ...VideoBlock_content @relay(mask: false)
    }
`;
const blocks: { [name: string]: BlockType<PageProps, WebSettingsProps, Providers, Locale> } =
    process.env.NODE_ENV === 'production'
        ? {
              ArticleDetailBlock: dynamic(() => import('./ArticleDetailBlock/ArticleDetailBlock')),
              ArticlesListBlock: dynamic(() => import('./ArticlesListBlock/ArticlesListBlock')),
              ButtonBlock: dynamic(() => import('./ButtonBlock/ButtonBlock')),
              CarouselBlock: dynamic(() => import('./CarouselBlock/CarouselBlock')),
              ErrorBlock: dynamic(() => import('./ErrorBlock/ErrorBlock')),
              GalleryBlock: dynamic(() => import('./GalleryBlock/GalleryBlock')),
              ImageBlock: dynamic(() => import('./ImageBlock/ImageBlock')),
              LatestArticlesBlock: dynamic(() => import('./LatestArticlesBlock/LatestArticlesBlock')),
              MapBlock: dynamic(() => import('./MapBlock/MapBlock')),
              RichTextBlock: dynamic(() => import('./RichTextBlock/RichTextBlock')),
              TemplateBlock: dynamic(() => import('./TemplateBlock/TemplateBlock')),
              VideoBlock: dynamic(() => import('./VideoBlock/VideoBlock')),
          }
        : {
              ArticleDetailBlock,
              ArticlesListBlock,
              ButtonBlock,
              CarouselBlock,
              ErrorBlock,
              GalleryBlock,
              ImageBlock,
              LatestArticlesBlock,
              MapBlock,
              RichTextBlock,
              TemplateBlock,
              VideoBlock,
          };

export default blocks;
