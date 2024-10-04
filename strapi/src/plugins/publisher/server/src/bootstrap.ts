import type { Core } from '@strapi/strapi';
import cronTast from './config/cron-tasks';

const bootstrap = ({ strapi }: { strapi: Core.Strapi }) => {
    // register action check
    cronTast.registerCronTasks({ strapi });
};

export default bootstrap;
