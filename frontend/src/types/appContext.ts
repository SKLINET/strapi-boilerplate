import { GeneralText } from './generalText';
import { Locale } from './locale';
import { Page } from './page';
import { appQueryResponse } from '../relay/__generated__/appQuery.graphql';

export type WebSetting = appQueryResponse['webSetting'];
export type SystemResources = appQueryResponse['systemResources'];

export type AppContextProps = Partial<WebSetting> & {
    uri?: string;
    nextRouteName?: string;
    systemResources: ReadonlyArray<GeneralText | null> | null;
    locales?: Locale[];
    locale?: string;
    defaultLocale?: string;
    pageId?: number;
    page?: Page;
    showSpinner: boolean;
    setShowSpinner: (show: boolean) => void;
};
