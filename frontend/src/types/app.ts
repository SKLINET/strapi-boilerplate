import { AppContextProps } from '@symbio/headless';
import { PageProps } from '../types/page';
import { WebSettingsProps } from '../types/webSettings';
import { ISystemResources } from '../types/systemResources';

// eslint-disable-next-line @typescript-eslint/ban-types
export type IApp = AppContextProps<PageProps, WebSettingsProps> & ISystemResources & {};
