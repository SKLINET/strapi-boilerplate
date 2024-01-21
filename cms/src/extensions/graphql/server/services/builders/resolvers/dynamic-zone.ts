import type { UID } from '@strapi/types';

import type { Context } from '@strapi/plugin-graphql/dist/server/src/services/types';

export default ({ strapi }: Context) => ({
  buildDynamicZoneResolver({
    contentTypeUID,
    attributeName,
  }: {
    contentTypeUID: UID.ContentType;
    attributeName: string;
  }) {
    return async (parent: any) => {
      // @ts-ignore
      const data: any = await strapi.entityService!.load(contentTypeUID, parent, attributeName);
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
