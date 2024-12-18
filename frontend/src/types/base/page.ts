import { BlocksPropsMap } from '@symbio/headless';
import { appQuery$data } from '../../relay/__generated__/appQuery.graphql';
import { pageDetailQuery$data } from '../../relay/__generated__/pageDetailQuery.graphql';

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
