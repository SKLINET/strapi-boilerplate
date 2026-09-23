import { GetStaticPropsContext } from 'next';
import { pageDetailQuery$data } from '../../relay/__generated__/pageDetailQuery.graphql';
import { BlocksPropsMap } from './block';
import { ParsedUrlQuery } from 'querystring';
import { appDataQuery$data } from '../../relay/__generated__/appDataQuery.graphql';
import { appRedirectQuery$data } from '../../relay/__generated__/appRedirectQuery.graphql';
import { appPageQuery$data } from '../../relay/__generated__/appPageQuery.graphql';
import { metadataGlobalQuery$data } from '../../relay/__generated__/metadataGlobalQuery.graphql';
import { metadataPageQuery$data } from '../../relay/__generated__/metadataPageQuery.graphql';

export interface SearchParamsProps {
    [key: string]: string | string[] | undefined;
}

export interface ServerContextProps {
    params: Promise<ParamsProps>;
    searchParams: Promise<SearchParamsProps>;
}

export interface ContextProps {
    params: ParamsProps;
}

export type PageProps = NonNullable<
    pageDetailQuery$data['item'] & { url: string | null | undefined; documentId: string }
>;

export interface ParamsProps {
    slug: string[] | undefined;
}

/**
 * Why a lookup ended up on the CMS 404 page. Carried through the cache boundary so `generateMetadata`
 * can noindex the URL without re-deriving it from `page.url === '404'`, which cannot tell a rewritten
 * unknown URL apart from the 404 page requested by its own slug.
 */
export type NotFoundReason = 'missing-page' | 'missing-item' | 'empty-block';

export type IPageResponse = appDataQuery$data &
    appPageQuery$data & {
        locale: string;
        blocksPropsMap: BlocksPropsMap;
        preview: boolean;
        isNotFound?: boolean;
        notFoundReason?: NotFoundReason;
    };

export type IMetadataResponse = metadataGlobalQuery$data &
    appRedirectQuery$data &
    metadataPageQuery$data & {
        locale: string;
        blocksPropsMap: BlocksPropsMap;
        preview: boolean;
        isNotFound?: boolean;
        notFoundReason?: NotFoundReason;
    };

export type IContext = GetStaticPropsContext<ParsedUrlQuery>;
