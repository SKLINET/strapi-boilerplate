import { GraphQLTaggedNode } from 'relay-runtime';
import config from '../../sklinet.config.json';
import { webSettingQuery } from '../relay/webSetting';
import StrapiProvider from './StrapiProvider';

class WebSettingProvider extends StrapiProvider<any, any> {}

// eslint-disable-next-line import/no-anonymous-default-export
export default new WebSettingProvider(
    webSettingQuery as unknown as GraphQLTaggedNode,
    webSettingQuery as unknown as GraphQLTaggedNode,
    {
        id: '',
        locales: config.i18n.locales,
        apiKey: 'webSetting',
    },
);
