import { NextPageContext } from 'next/types';
import { Environment } from 'relay-runtime';
import { ParsedUrlQuery } from 'querystring';
import { PageText } from './pageText';
import { GeneralText } from './generalText';
import { Menu } from './menu';
import { Setting } from './setting';
import { Locale } from './locale';
import { appQueryResponse } from '../relay/__generated__/appQuery.graphql';
import { Meta } from './meta';
export type AppData = appQueryResponse;

export interface Page {
    id: string;
    _id: string;
    url: string;
    title: string;
    content?: string;
    routeName: string;
    meta: Meta;
    texts: PageText[];
    blocks: any[];
    lvl: number;
    children?: Page[];
}

interface Redirect {
    redirectFrom: string;
    redirectTo: string;
    statusCode: number;
}

interface MyPageContext extends MyPageProps {
    environment?: Environment;
}

export interface MyPageProps extends AppData {
    redirect?: Redirect;
    page?: Page;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    relayData?: any;
    params?: Record<string, any>;
    query?: ParsedUrlQuery;
    variables?: Record<string, any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blocksProps?: any;
}

export interface APIPageProps {
    findPage?: Page;
    findRedirect?: Redirect;
    generalTexts: GeneralText[];
    menus: Menu[];
    settings: Setting[];
    locales: Locale[];
}
