'use strict';

const { sanitize } = require('@strapi/utils');

module.exports = ({ strapi }) => ({
  buildComponentResolver({ contentTypeUID, attributeName }) {
    const { transformArgs } = strapi.plugin('graphql').service('builders').utils;

    return async (parent, args = {}, ctx) => {
      const contentType = strapi.getModel(contentTypeUID);

      const { component: componentName } = contentType.attributes[attributeName];
      const component = strapi.getModel(componentName);
      const componentTypeName = component.globalId;
      const transformedArgs = transformArgs(args, { contentType: component, usePagination: true });
      const sanitizedQuery = await sanitize.contentAPI.query(transformedArgs, contentType, {
        auth: ctx?.state?.auth,
      });
      const data = await strapi.entityService.load(contentTypeUID, { ...parent, id: typeof parent?.id === 'string' ? parent?.id?.replace(/.*_/gi, '') : parent?.id }, attributeName, sanitizedQuery);
      if (data) {
        if (Array.isArray(data)) {
          for (const it of data) {
            it.id = `${componentTypeName}_${it.id}`;
          }
        } else {
          data.id = `${componentTypeName}_${data.id}`;
        }
      }
      return data;
    };
  },
});
