import { GetStaticPropsContext } from 'next';
import { pageDetailQuery$data } from '../../relay/__generated__/pageDetailQuery.graphql';
import { BlocksPropsMap } from './block';
import { ParsedUrlQuery } from 'querystring';
import { appDataQuery$data } from '../../relay/__generated__/appDataQuery.graphql';
import { appRedirectQuery$data } from '../../relay/__generated__/appRedirectQuery.graphql';
import { appPageQuery$data } from '../../relay/__generated__/appPageQuery.graphql';
import { metadataGlobalQuery$data } from '../../relay/__generated__/metadataGlobalQuery.graphql';
import { metadataPageQuery$data } from '../../relay/__generated__/metadataPageQuery.graphql';

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

export type IPageResponse = appDataQuery$data &
    appPageQuery$data & {
        locale: string;
        blocksPropsMap: BlocksPropsMap;
        preview: boolean;
    };

export type IMetadataResponse = metadataGlobalQuery$data &
    appRedirectQuery$data &
    metadataPageQuery$data & {
        locale: string;
        blocksPropsMap: BlocksPropsMap;
        preview: boolean;
    };

export type IContext = GetStaticPropsContext<ParsedUrlQuery> & {
    searchParams: { [key: string]: string | string[] | undefined };
};
