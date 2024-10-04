import { PLUGIN_ID } from './pluginId';

/**
 * A helper function to obtain a plugin service
 *
 * @return service
 */
// @ts-ignore
export const getPluginService = (name) => strapi.plugin(PLUGIN_ID).service(name);
