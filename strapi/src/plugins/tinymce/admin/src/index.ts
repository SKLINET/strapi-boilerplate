import pluginPkg from '../../package.json';
import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { prefixPluginTranslations } from './utils/prefixPluginTranslations';
import pluginPermissions from './permissions';
import Wysiwyg from './components/Wysiwyg';

const name = pluginPkg.strapi.name;

export default {
    register(app: any) {
        app.addFields({ type: 'wysiwyg', Component: Wysiwyg });

        app.createSettingSection(
            {
                id: PLUGIN_ID,
                intlLabel: {
                    id: `${PLUGIN_ID}.plugin.name`,
                    defaultMessage: 'TinyMCE',
                },
            },
            [
                {
                    intlLabel: {
                        id: getTranslation('settings.page-title'),
                        defaultMessage: 'Configuration',
                    },
                    id: 'settings',
                    to: `/settings/${PLUGIN_ID}`,
                    Component: async () => {
                        return import('./pages/Settings');
                    },
                    permissions: pluginPermissions['settings'],
                },
            ],
        );

        app.registerPlugin({
            id: PLUGIN_ID,
            initializer: Initializer,
            isReady: false,
            name: name,
        });
    },

    bootstrap(app: any) {},
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
