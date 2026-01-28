import * as d from '../relay/__generated__/webSettingQuery.graphql';
import { webSettingQuery } from '../relay/webSetting';
import AbstractSingletonStrapiProvider from '../lib/provider/AbstractSingletonStrapiProvider';

class WebSettingProvider extends AbstractSingletonStrapiProvider<
    d.webSettingQuery,
    NonNullable<d.webSettingQuery$data['item']>
> {
    getApiKey(): string {
        return 'webSetting';
    }

    getId(): string {
        return 'api::web-setting.web-setting';
    }
}
export default new WebSettingProvider(webSettingQuery);
