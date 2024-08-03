module.exports = (plugin) => {
  const imageServices = plugin.services["image-manipulation"]();

  // Disable all transformations and optimizations done by Strapi.
  // Instead rely on Cloudinary's transformations. The custom provider in
  // backend/src/providers/upload-cloudinary/index.js sets the necessary thumbnail URL.
  plugin.services["image-manipulation"] = () => ({
    ...imageServices,
    generateThumbnail: () => null,
    optimize: () => null,
    isSupportedImage: () => null,
    getDimensions: () => null,
    generateResponsiveFormats: () => null,
    isOptimizableImage: () => false,
    isImage: () => false,
  });

  return plugin;
};
