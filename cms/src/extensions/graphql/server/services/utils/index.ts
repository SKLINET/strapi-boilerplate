import mappers from './mappers';
import attributes from './attributes';
import naming from './naming';

import type { Context } from '@strapi/plugin-graphql/dist/server/src/services/types';

export default (context: any) => ({
  naming: naming(context),
  attributes: attributes(context),
  mappers: mappers(context),
});
