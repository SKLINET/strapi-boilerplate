import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  strapi.customFields.register({
    name: 'video',
    plugin: 'video-field',
    type: 'json',
  });
};

export default register;
