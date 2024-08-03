import cronTasks from "./cron-tasks";
export default ({ env }) => ({
  host: env('HOST', 'localhost'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
    proxy: true
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  url: env('BACKEND_URL', 'http://localhost:1337'),
  proxy: true,
  cron: {
    enabled: true,
    tasks: cronTasks,
  },
  http: {
    serverOptions: {
      requestTimeout: 30 * 60 * 1000,
    }
  }
});
