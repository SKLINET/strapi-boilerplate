'use strict';
const path = require('path');

// WARNING: the admin panel now uses webpack 5 to bundle the application.

module.exports = (config, webpack) => {
    config.resolve.alias.axios = path.dirname(require.resolve('axios/package.json'))
    return config;
};
