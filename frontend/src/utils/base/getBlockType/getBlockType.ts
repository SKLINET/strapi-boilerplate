export function getBlockType(type: string | undefined): string {
    switch (type) {
        case 'ComponentBlockArticleDetailBlock':
            return 'ArticleDetailBlock';
        case 'ComponentBlockArticlesListBlock':
            return 'ArticlesListBlock';
        case 'ComponentBlockFormBlock':
            return 'FormBlock';
        case 'ComponentBlockTemplateBlock':
            return 'TemplateBlock';
        case 'ComponentBlockVideoBlock':
            return 'VideoBlock';
    }
    return '';
}
