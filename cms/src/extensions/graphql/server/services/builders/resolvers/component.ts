import { sanitize, validate } from '@strapi/utils';
import type { Attribute, UID } from '@strapi/types';

import type { Context } from '@strapi/plugin-graphql/dist/server/src/services/types';

export default ({ strapi }: Context) => ({
  buildComponentResolver({
    contentTypeUID,
    attributeName,
  }: {
    contentTypeUID: UID.ContentType;
    attributeName: string;
  }) {
    const { transformArgs } = strapi.plugin('graphql').service('builders').utils;

    return async (parent: any, args: any, ctx: any) => {
      // @ts-ignore
      const contentType = strapi.getModel(contentTypeUID);

      const { component: componentName } = contentType.attributes[
        attributeName
        ] as Attribute.Component;
      const component = strapi.getModel(componentName);
      const componentTypeName = component.globalId;

      const transformedArgs = transformArgs(args, { contentType: component, usePagination: true });
      await validate.contentAPI.query(transformedArgs, component, {
        auth: ctx?.state?.auth,
      });
      const sanitizedQuery = await sanitize.contentAPI.query(transformedArgs, component, {
        auth: ctx?.state?.auth,
      });

      // @ts-ignore
      const data = await strapi.entityService!.load(contentTypeUID, { ...parent, id: typeof parent?.id === 'string' ? parent?.id?.replace(/.*_/gi, '') : parent?.id }, attributeName, sanitizedQuery);
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
