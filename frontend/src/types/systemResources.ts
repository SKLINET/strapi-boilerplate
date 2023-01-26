import { appSystemResourceFragment } from '../relay/__generated__/appSystemResourceFragment.graphql';

export type ISystemResources =
    | {
          systemResources: appSystemResourceFragment | null | undefined;
      }
    | null
    | undefined;
