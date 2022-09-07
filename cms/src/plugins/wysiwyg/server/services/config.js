"use strict";

/**
 * config.js configuration service
 */

module.exports = ({ strapi }) => {
    return {
        getConfig(key = "editor") {
            return strapi.plugin("wysiwyg").config(key) ?? {};
        },
    };
};
