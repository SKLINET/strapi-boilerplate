import createCollectionTypeMutationsBuilder from './collection-type';
import createSingleTypeMutationsBuilder from './single-type';
import type { Context } from '@strapi/plugin-graphql/dist/server/src/services/types';

export default (context: Context) => ({
  ...createCollectionTypeMutationsBuilder(context),
  ...createSingleTypeMutationsBuilder(context),
});
