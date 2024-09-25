import { getTranslation } from './utils/getTranslation';
import FieldIcon from './components/Field/Icon';
import { PLUGIN_ID } from './pluginId';

export default {
  register(app: any) {
    app.customFields.register({
      name: 'video',
      pluginId: 'video-field',
      type: 'json',
      icon: FieldIcon,
      intlLabel: {
        id: getTranslation('video-field.label'),
        defaultMessage: 'Video',
      },
      intlDescription: {
        id: getTranslation('video-field.description'),
        defaultMessage: 'Video field for YouTube or Vimeo.',
      },
      components: {
        Input: async () =>
          import(/* webpackChunkName: "video-field-input-component" */ './components/Field/Input'),
      },
    });
  },

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTranslations = await Promise.all(
      (locales as string[]).map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
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
      })
    );

    return importedTranslations;
  },
};
