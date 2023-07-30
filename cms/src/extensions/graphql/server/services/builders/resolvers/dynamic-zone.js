'use strict';

module.exports = ({ strapi }) => ({
  buildDynamicZoneResolver({ contentTypeUID, attributeName }) {
    return async (parent) => {
      const data = await strapi.entityService.load(contentTypeUID, parent, attributeName);
      if (data) {
        if (Array.isArray(data)) {
          for (const it of data) {
            const contentType = strapi.getModel(it.__component);
            it.id = `${contentType.globalId}_${it.id}`;
          }
        } else {
          const contentType = strapi.getModel(data.__component);
          data.id = `${contentType.globalId}_${data.id}`;
        }
      }
      return data;
    };
  },
});
