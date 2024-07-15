import { BlocksPropsMap } from '@symbio/headless';
import { appQuery$data } from '../../relay/__generated__/appQuery.graphql';
import { articleDetailFragment$data } from '../../relay/__generated__/articleDetailFragment.graphql';
import { ContextProps } from './page';
import { appPageFragment$data } from '../../relay/__generated__/appPageFragment.graphql';

export type IApp = appQuery$data & {
    item: Omit<articleDetailFragment$data, ' $fragmentType'> | null;
    page: Omit<appPageFragment$data, ' $fragmentType'> | null | undefined;
    locale: string;
    blocksPropsMap: BlocksPropsMap;
    preview: boolean;
    context: ContextProps;
};
