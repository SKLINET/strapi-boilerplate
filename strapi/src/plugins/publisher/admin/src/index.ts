import ActionManager from './components/ActionManager';
import { Initializer } from './components/Initializer';
import { PLUGIN_ID } from './pluginId';
import { prefixPluginTranslations } from './utils/prefixPluginTranslations';

export default {
    register(app: any) {
        app.registerPlugin({
            id: PLUGIN_ID,
            initializer: Initializer,
            isReady: false,
            name: PLUGIN_ID,
        });
    },

    bootstrap(app: any) {
        app.getPlugin('content-manager').injectComponent('editView', 'right-links', {
            name: PLUGIN_ID,
            Component: ActionManager,
        });
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
