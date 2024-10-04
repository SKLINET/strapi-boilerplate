'use strict';

import { PLUGIN_ID } from '../utils/pluginId';

export default ({ strapi }) => ({
    get() {
        return strapi.config.get(`plugin.${PLUGIN_ID}`);
    },
});
