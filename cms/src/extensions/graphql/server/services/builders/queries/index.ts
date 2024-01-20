import createCollectionTypeQueriesBuilder from './collection-type';
import createSingleTypeQueriesBuilder from './single-type';
import type { Context } from '@strapi/plugin-graphql/dist/server/src/services/types';

export default (context: Context) => ({
  ...createCollectionTypeQueriesBuilder(context),
  ...createSingleTypeQueriesBuilder(context),
});
