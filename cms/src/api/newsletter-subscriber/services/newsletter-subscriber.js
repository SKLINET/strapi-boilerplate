'use strict';

/**
 * newsletter-subscriber service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::newsletter-subscriber.newsletter-subscriber');
