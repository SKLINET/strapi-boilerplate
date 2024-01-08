const cronTasks = require("./cron-tasks");
module.exports = ({ env }) => ({
  host: env('HOST', 'localhost'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
    proxy: true
  },
  stripeApiKey: env("STRIPE_API_KEY"),
  stripeWebhookSecret: env("STRIPE_WEBHOOK_SECRET"),
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  url: env('BACKEND_URL', 'http://localhost:1337'),
  proxy: true,
  cron: { enabled: true, tasks: cronTasks },
});
