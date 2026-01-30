import * as d from '../relay/__generated__/webSettingQuery.graphql';
import { webSettingQuery } from '../relay/webSetting';
import AbstractSingletonElasticProvider from '../lib/provider/AbstractSingletonElasticProvider';

class WebSettingProvider extends AbstractSingletonElasticProvider<
    d.webSettingQuery,
    NonNullable<d.webSettingQuery$data['item']>
> {
    getApiKey(): string {
        return 'web-setting';
    }

    getId(): string {
        return 'api::web-setting.web-setting';
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new WebSettingProvider(webSettingQuery);
