import { PLUGIN_ID } from './pluginId';

export const getPluginEntityUid = (entity) => `plugin::${PLUGIN_ID}.${entity}`;
