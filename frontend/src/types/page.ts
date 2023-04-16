import { pageDetailQuery$data } from '../relay/__generated__/pageDetailQuery.graphql';

export type PageProps = NonNullable<pageDetailQuery$data['item'] & { url: string; id: string }>;

export interface IPage {
    data: {
        attributes: {
            url: string;
        };
    };
}
