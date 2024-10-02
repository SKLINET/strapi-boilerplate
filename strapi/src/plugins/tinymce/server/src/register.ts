"use strict";

import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  strapi.customFields.register({
    name: 'tinymce',
    plugin: 'tinymce',
    type: 'string',
  });
};

export default register;
