'use strict';

/**
 * web-setting service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::web-setting.web-setting');
