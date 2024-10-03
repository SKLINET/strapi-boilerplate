import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
import { prefixPluginTranslations } from './utils/prefixPluginTranslations';

export default {
    register(app: any) {
        app.customFields.register({
            name: 'bold-title-editor',
            pluginId: 'bold-title-editor',
            type: 'string',
            icon: PluginIcon,
            intlLabel: {
                id: getTranslation('field.title'),
                defaultMessage: 'Bold Title Editor',
            },
            intlDescription: {
                id: getTranslation('field.description'),
                defaultMessage: 'A bold title/text editor to accent certain parts',
            },
            options: {
                advanced: [
                    {
                        type: 'checkbox',
                        name: 'required',
                        intlLabel: {
                            id: getTranslation('field.required-field'),
                            defaultMessage: 'Required field',
                        },
                        description: "You won't be able to create an entry if this field is empty",
                    },
                ],
            },
            components: {
                Input: async () => import(/* webpackChunkName: "video-field-input-component" */ './components/Input'),
            },
        });

        app.registerPlugin({
            id: PLUGIN_ID,
            initializer: Initializer,
            isReady: false,
            name: PLUGIN_ID,
        });
    },

    async registerTrads(app: any) {
        const { locales } = app;

        const importedTranslations = await Promise.all(
            (locales as string[]).map((locale) => {
                return import(`./translations/${locale}.json`)
                    .then(({ default: data }) => {
                        return {
                            data: prefixPluginTranslations(data, PLUGIN_ID),
                            locale,
                        };
                    })
                    .catch(() => {
                        return {
                            data: {},
                            locale,
                        };
                    });
            }),
        );

        return importedTranslations;
    },
};
