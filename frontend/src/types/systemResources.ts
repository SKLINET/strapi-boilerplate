import { appSystemResourceFragment$data } from '../../src/relay/__generated__/appSystemResourceFragment.graphql';

export type ISystemResources =
    | {
          systemResources: appSystemResourceFragment$data | null | undefined;
      }
    | null
    | undefined;
