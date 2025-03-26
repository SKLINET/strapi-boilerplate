import { articleDetailFragment$data } from '../../relay/__generated__/articleDetailFragment.graphql';
import { ContextProps } from './page';
import { appPageFragment$data } from '../../relay/__generated__/appPageFragment.graphql';
import { BlocksPropsMap } from './block';
import { appDataQuery$data } from '../../relay/__generated__/appDataQuery.graphql';
import { appPageQuery$data } from '../../relay/__generated__/appPageQuery.graphql';

export type IApp = appDataQuery$data &
    appPageQuery$data & {
        item: Omit<articleDetailFragment$data, ' $fragmentType'> | null;
        page: Omit<appPageFragment$data, ' $fragmentType'> | null | undefined;
        locale: string;
        blocksPropsMap: BlocksPropsMap;
        preview: boolean;
        context: ContextProps;
    };
