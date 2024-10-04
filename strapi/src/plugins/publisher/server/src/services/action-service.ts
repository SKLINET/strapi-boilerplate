'use strict';

/**
 *  service
 */

import { factories } from '@strapi/strapi';

const { createCoreService } = factories;

export default createCoreService('plugin::publisher.action');
