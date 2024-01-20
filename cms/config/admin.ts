export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '643bb60958200c3451b23bb9ed043dd8'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'd9b0df66ff97a666027e665707b4e3e7'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'd9b0df66ff97a666027e665707b4e3e7'),
    },
  },
  watchIgnoreFiles: [
    '**/config/sync/**',
  ],
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', false),
  },
});
