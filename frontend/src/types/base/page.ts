import { GetStaticPropsContext } from 'next';
import { appQuery$data } from '../../relay/__generated__/appQuery.graphql';
import { pageDetailQuery$data } from '../../relay/__generated__/pageDetailQuery.graphql';
import { BlocksPropsMap } from './block';
import { ParsedUrlQuery } from 'querystring';

export interface ServerContextProps {
    params: Promise<ParamsProps>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface ContextProps {
    params: ParamsProps;
    searchParams: { [key: string]: string | string[] | undefined };
}

export type PageProps = NonNullable<
    pageDetailQuery$data['item'] & { url: string | null | undefined; documentId: string }
>;

export interface ParamsProps {
    slug: string[] | undefined;
}

export type IPageResponse = appQuery$data & {
    locale: string;
    blocksPropsMap: BlocksPropsMap;
    preview: boolean;
};

export type IContext = GetStaticPropsContext<ParsedUrlQuery> & {
    searchParams: { [key: string]: string | string[] | undefined };
};
