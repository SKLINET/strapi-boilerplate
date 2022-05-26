import { GeneralText } from './generalText';
import { Locale } from './locale';
import { appQueryResponse } from '../relay/__generated__/appQuery.graphql';
import { PageProps } from './page';

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
    page?: PageProps;
    showSpinner: boolean;
    setShowSpinner: (show: boolean) => void;
};
