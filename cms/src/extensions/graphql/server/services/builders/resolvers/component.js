'use strict';

module.exports = ({ strapi }) => ({
  buildComponentResolver({ contentTypeUID, attributeName }) {
    const { transformArgs } = strapi.plugin('graphql').service('builders').utils;

    return async (parent, args = {}) => {
      const contentType = strapi.getModel(contentTypeUID);
      const { component: componentName } = contentType.attributes[attributeName];
      const component = strapi.getModel(componentName);
      const componentTypeName = component.globalId;
      const transformedArgs = transformArgs(args, { contentType: component, usePagination: true });
      const data = await strapi.entityService.load(contentTypeUID, { ...parent, id: typeof parent?.id === 'string' ? parent?.id?.replace(/.*_/gi, '') : parent?.id }, attributeName, transformedArgs);
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
