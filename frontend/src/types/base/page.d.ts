import { Environment } from 'relay-runtime';
import { ParsedUrlQuery } from 'querystring';
import { PageText } from './pageText';
import { GeneralText } from './generalText';
import { IMenu } from '../menu';
import { Setting } from './setting';
import { Locale } from './locale';
import { Meta } from './meta';
import { appDataQuery$data } from '../../relay/__generated__/appDataQuery.graphql';
import { appPageQuery$data } from '../../relay/__generated__/appPageQuery.graphql';

export type AppData = appDataQuery$data & appPageQuery$data;

export interface PageDefault {
    documentId: string;
    _id: string;
    url: string | null | undefined;
    title: string;
    content?: string;
    routeName: string;
    meta: Meta;
    texts: PageText[];
    blocks: any[];
    lvl: number;
    children?: PageDefault[];
}

interface Redirect {
    redirectFrom: string;
    redirectTo: string;
    statusCode: number;
}

interface MyPageContext extends MyPageProps {
    environment?: Environment;
}

export type MyPageProps = AppData & {
    redirect?: Redirect;
    page?: PageDefault;

    relayData?: any;
    params?: Record<string, any>;
    query?: ParsedUrlQuery;
    variables?: Record<string, any>;

    blocksProps?: any;
};

export interface APIPageProps {
    findPage?: PageDefault;
    findRedirect?: Redirect;
    generalTexts: GeneralText[];
    menus: IMenu[];
    settings: Setting[];
    locales: Locale[];
}
