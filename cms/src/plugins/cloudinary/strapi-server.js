"use strict";

const { v2: cloudinary } = require("cloudinary");

function initiateClient(strapi) {
  cloudinary.config({
    cloud_name: strapi.plugin("cloudinary").config("cloud_name"),
    api_key: strapi.plugin("cloudinary").config("api_key"),
    api_secret: strapi.plugin("cloudinary").config("api_secret"),
  });

  strapi.cloudinary = cloudinary;
}

module.exports = {
  async bootstrap({ strapi }) {
    initiateClient(strapi);
  },
};
