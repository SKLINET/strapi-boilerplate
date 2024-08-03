"use strict";
const intoStream = require("into-stream");
const utils = require("@strapi/utils");

// This provider relies on the local "cloudinary" plugin to setup
// initiate Cloudinary SDK and make it available at `strapi.cloudinary`.

module.exports = {
  init: () => {
    const upload = async (file, customConfig = {}) => {
      console.log('CLOUDINARY - upload file', file);
      return new Promise((resolve, reject) => {
        const config = {
          resource_type: "auto",
          public_id: file.hash,
        };

        if (file.ext) {
          config.filename = `${file.hash}${file.ext}`;
        }

        if (file.path) {
          config.folder = file.path;
        }

        // For files smaller than 95 MB use regular upload as it tends to be faster
        // and fallback to chunked upload for larger files as that's required by Cloudinary.
        // The Cloudinary's max limit for regular upload is actually 100 MB but add some headroom
        // for size counting shenanigans. (Supposedly, Strapi provides the size in kilobytes as a
        // float here but it may be kibibytes as well. Who knows!)
        console.log('Cloudinary file.size', file.size);
        const upload_method =
          file.size && file.size < 1000 * 95
            ? strapi.cloudinary.uploader.upload_stream
            : strapi.cloudinary.uploader.upload_chunked_stream;

        const uploadStream = upload_method(
          { ...config, ...customConfig },
          (err, image) => {
            if (err) {
              console.log('Cloudinary error:', err);
              if (err.message.includes("File size too large")) {
                reject(new utils.errors.PayloadTooLargeError());
              } else {
                reject(
                  new Error(`Error uploading to cloudinary: ${err.message}`)
                );
              }
              return;
            }

            if (!image) {
              return;
            }

            if (image.resource_type === "video") {
              file.previewUrl = strapi.cloudinary.url(
                `${image.public_id}.gif`,
                {
                  video_sampling: 6,
                  delay: 200,
                  width: 250,
                  crop: "scale",
                  resource_type: "video",
                }
              );
            }

            // The thumbnail format is used by the Strapi admin panel.
            // Set it manually to leverage Cloudinary transformations
            // instead of transforming the images in Strapi (that is disabled
            // in backend/src/extensions/upload/strapi-server.js)
            if (image.resource_type === "image") {
              file.formats = {
                thumbnail: {
                  url: strapi.cloudinary.url(image.public_id, {
                    format: "jpeg",
                    width: 250,
                    crop: "scale",
                    // Use https in the url
                    secure: true,
                  }),
                },
              };
            }

            // The disabled transformations also calculated the image dimensions.
            // Take them from Cloudinary instead.
            file.width = image.width;
            file.height = image.height;

            file.url = image.secure_url;
            file.provider_metadata = {
              public_id: image.public_id,
              resource_type: image.resource_type,
            };
            resolve();
          }
        );
        console.log('CLOUDINARY FILE WAS UPLOADED');

        if (file.stream) {
          file.stream.pipe(uploadStream);
        } else if (file.buffer) {
          intoStream(file.buffer).pipe(uploadStream);
        } else {
          throw new Error("Missing file stream or buffer");
        }
      });
    };

    return {
      uploadStream(file, customConfig = {}) {
        return upload(file, customConfig);
      },
      upload(file, customConfig = {}) {
        return upload(file, customConfig);
      },
      async delete(file, customConfig = {}) {
        try {
          const { resource_type: resourceType, public_id: publicId } =
            file.provider_metadata ?? {};
          const deleteConfig = {
            resource_type: resourceType || "image",
            invalidate: true,
            ...customConfig,
          };

          const response = await strapi.cloudinary.uploader.destroy(
            `${publicId}`,
            deleteConfig
          );

          if (response.result !== "ok" && response.result !== "not found") {
            throw new Error(response.result);
          }
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(`Error deleting on cloudinary: ${error.message}`);
          }

          throw error;
        }
      },
    };
  },
};
