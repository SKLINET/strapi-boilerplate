export function getBlockType(type: string | undefined): string {
    switch (type) {
        case 'ComponentBlockButtonBlock':
            return 'ButtonBlock';
        case 'ComponentBlockCarouselBlock':
            return 'CarouselBlock';
        case 'ComponentBlockGalleryBlock':
            return 'GalleryBlock';
        case 'ComponentBlockImageBlock':
            return 'ImageBlock';
        case 'ComponentBlockMapBlock':
            return 'MapBlock';
        case 'ComponentBlockArticleDetailBlock':
            return 'ArticleDetailBlock';
        case 'ComponentBlockArticlesListBlock':
            return 'ArticlesListBlock';
        case 'ComponentBlockLatestArticlesBlock':
            return 'LatestArticlesBlock';
        case 'ComponentBlockRichTextBlock':
            return 'RichTextBlock';
        case 'ComponentBlockVideoBlock':
            return 'VideoBlock';
        case 'ComponentBlockYoutubeVimeoBlock':
            return 'YoutubeVimeoBlock';
        case 'ComponentBlockErrorBlock':
            return 'ErrorBlock';
    }
    return '';
}
