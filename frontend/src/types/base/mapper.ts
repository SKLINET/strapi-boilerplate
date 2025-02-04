import { appPageFragment$data } from '../../relay/__generated__/appPageFragment.graphql';

export interface IMapperConfig {
    locale: string;
    pages: {
        articleDetailPage: Omit<appPageFragment$data, ' $fragmentType'> | null | undefined;
    };
}
