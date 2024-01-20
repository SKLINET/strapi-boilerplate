import associationResolvers from './association';
import mutationsResolvers from './mutation';
import queriesResolvers from './query';
import componentResolvers from './component';
import dynamicZoneResolvers from './dynamic-zone';

import type { Context } from '@strapi/plugin-graphql/dist/server/src/services/types';

export default (context: Context) => ({
  // Generics
  ...associationResolvers(context),

  // Builders
  ...mutationsResolvers(context),
  ...queriesResolvers(context),
  ...componentResolvers(context),
  ...dynamicZoneResolvers(context),
});
