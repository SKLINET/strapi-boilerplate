import PageProvider from './PageProvider';
import ArticleProvider from './ArticleProvider';
import ArticleCategoryProvider from './ArticleCategoryProvider';
import WebSettingProvider from './WebSettingProvider';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    page: PageProvider,
    article: ArticleProvider,
    articleCategory: ArticleCategoryProvider,
    webSetting: WebSettingProvider,
};
