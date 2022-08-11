import { GraphQLTaggedNode } from 'relay-runtime';
import config from '../../sklinet.config.json';
import { webSettingQuery } from '../relay/webSetting';
import StrapiProvider from './StrapiProvider';

class WebSettingProvider extends StrapiProvider<any, any> {}

export default new WebSettingProvider(
    webSettingQuery as unknown as GraphQLTaggedNode,
    webSettingQuery as unknown as GraphQLTaggedNode,
    {
        id: '',
        locales: config.i18n.locales,
        apiKey: 'webSetting',
    },
);
