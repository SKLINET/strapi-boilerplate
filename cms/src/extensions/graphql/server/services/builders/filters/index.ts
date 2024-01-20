import contentType from './content-type';
import type { Context } from '@strapi/plugin-graphql/dist/server/src/services/types';

export default (context: Context) => ({
  ...contentType(context),
});
