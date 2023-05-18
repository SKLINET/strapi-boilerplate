import PageProvider from './PageProvider';
import NewsProvider from './NewsProvider';
import WebSettingProvider from './WebSettingProvider';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    page: PageProvider,
    news: NewsProvider,
    webSetting: WebSettingProvider,
};
