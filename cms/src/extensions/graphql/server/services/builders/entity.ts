import { objectType } from 'nexus';
import { prop, identity, isEmpty } from 'lodash/fp';
import type { Schema } from '@strapi/types';

import type { Context } from '@strapi/plugin-graphql/dist/server/src/services/types';

export default ({ strapi }: Context) => {
  const { naming } = strapi.plugin('graphql').service('utils');

  return {
    /**
     * Build a higher level type for a content type which contains the attributes, the ID and the metadata
     * @param {object} contentType The content type which will be used to build its entity type
     * @return {NexusObjectTypeDef}
     */
    buildEntityDefinition(contentType: Schema.ContentType) {
      const { attributes } = contentType;

      const name = naming.getEntityName(contentType);
      const typeName = naming.getTypeName(contentType);

      return objectType({
        name,

        definition(t) {
          // Keep the ID attribute at the top level
          t.id('id', {
            resolve: function (data) {
              return `${typeName}_${data['id']}`;
            }
          });

          if (!isEmpty(attributes)) {
            // Keep the fetched object into a dedicated `attributes` field
            // TODO: [v4] precise why we keep the ID
            t.field('attributes', {
              type: typeName,
              resolve: identity,
            });
          }

          // todo[v4]: add the meta field to the entity when there will be data in it (can't add an empty type for now)
          // t.field('meta', { type: utils.getEntityMetaName(contentType) });
        },
      });
    },
  };
};
