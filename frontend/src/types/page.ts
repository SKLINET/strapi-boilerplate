import { BlocksPropsMap } from '@symbio/headless';
import { appQuery$data } from '../relay/__generated__/appQuery.graphql';
import { appSystemResourceFragment$data } from '../relay/__generated__/appSystemResourceFragment.graphql';
import { pageDetailQuery$data } from '../relay/__generated__/pageDetailQuery.graphql';

export interface ContextProps {
    params: ParamsProps;
    searchParams: { [key: string]: string | string[] | undefined };
}

export type PageProps = NonNullable<pageDetailQuery$data['item'] & { url: string; id: string }>;

export interface ParamsProps {
    slug: string[] | undefined;
}

export interface IPage {
    data: {
        attributes: {
            url: string;
        };
    };
}

export interface IPageResponse {
    page: NonNullable<pageDetailQuery$data['item'] & { url: string; id: string }> | null | undefined;
    systemResources: appSystemResourceFragment$data | null | undefined;
    redirect: appQuery$data['redirect'];
    webSetting: appQuery$data['webSetting'];
    contactForm: appQuery$data['contactForm'];
    locale: string;
    blocksPropsMap: BlocksPropsMap;
    preview: boolean;
}
