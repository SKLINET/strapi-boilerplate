'use strict';

import { pluginConfigSchema } from './schema';

export default {
    default: () => ({
        actions: {
            syncFrequency: '*/1 * * * *',
        },
        hooks: {
            beforePublish: () => {},
            afterPublish: () => {},
            beforeUnpublish: () => {},
            afterUnpublish: () => {},
        },
        components: {
            dateTimePicker: {
                step: 1,
            },
        },
    }),
    validator: async (config) => {
        await pluginConfigSchema.validate(config);
    },
};
