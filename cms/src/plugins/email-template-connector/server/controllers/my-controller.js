'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('email-template-connector')
      .service('myService')
      .getWelcomeMessage();
  },
});
