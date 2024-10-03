import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
import { prefixPluginTranslations } from './utils/prefixPluginTranslations';
import addColumnToTableHook from './hooks/addColumnToTableHook';

export default {
    register(app: any) {
        app.customFields.register({
            name: 'content-tags',
            pluginId: PLUGIN_ID,
            type: 'text',
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
                        sectionTitle: {
                            id: 'global.settings',
                            defaultMessage: 'Settings',
                        },
                        items: [
                            {
                                name: 'required',
                                type: 'checkbox',
                                intlLabel: {
                                    id: 'form.attribute.item.requiredField',
                                    defaultMessage: 'Required field',
                                },
                                description: {
                                    id: 'form.attribute.item.requiredField.description',
                                    defaultMessage: "You won't be able to create an entry if this field is empty",
                                },
                            },
                        ],
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

    bootstrap(app: any) {
        app.registerHook('Admin/CM/pages/ListView/inject-column-in-table', addColumnToTableHook);
    },
    async registerTrads(app: any) {
        const { locales } = app;

        const importedTranslations = await Promise.all(
            (locales as string[]).map((locale) => {
                return import(/* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`)
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
