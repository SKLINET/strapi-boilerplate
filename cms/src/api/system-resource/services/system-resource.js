'use strict';

/**
 * system-resource service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::system-resource.system-resource');
