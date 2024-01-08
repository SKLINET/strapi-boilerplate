import { BlocksPropsMap } from '@symbio/headless';
import { appQuery$data } from '../relay/__generated__/appQuery.graphql';
import { appSystemResourceFragment$data } from '../relay/__generated__/appSystemResourceFragment.graphql';
import { pageDetailQuery$data } from '../relay/__generated__/pageDetailQuery.graphql';
import { articleDetailFragment$data } from '../relay/__generated__/articleDetailFragment.graphql';
import { ContextProps } from './page';

export interface IApp {
    item: Omit<articleDetailFragment$data, ' $fragmentType'> | null;
    page: NonNullable<pageDetailQuery$data['item'] & { url: string; id: string }> | null | undefined;
    systemResources: appSystemResourceFragment$data | null | undefined;
    redirect: appQuery$data['redirect'];
    webSetting: appQuery$data['webSetting'];
    contactForm: appQuery$data['contactForm'];
    locale: string;
    blocksPropsMap: BlocksPropsMap;
    preview: boolean;
    context: ContextProps;
}
