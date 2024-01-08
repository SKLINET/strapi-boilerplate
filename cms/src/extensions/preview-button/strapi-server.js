const pluginId = "preview-button";
const config = require("./config");
module.exports = (plugin) => {
  plugin.controllers["preview-button"].findOne = findOne;
  return plugin;
};

async function findOne(ctx) {
  const { uid, id } = ctx.request.params;
  const { contentTypes, baseUrl } = await strapi.config.get(
    `plugin.${pluginId}`,
    config.default
  );
  const supportedType = contentTypes.find((type) => type.uid === uid);

  // Collection types will find by the ID and single types do not.
  const findParams = id ? { where: { id } } : {};
  const entity = await strapi.query(uid).findOne(findParams);
  const urls = getPreviewUrls(entity, supportedType, baseUrl);
  ctx.send({ urls });
}
// Change cases based on content-type UIDs !
function getPreviewUrls(entity, supportedType, baseUrl) {
  let slug = "";
  switch (supportedType?.type) {
    case "pages":
      slug = entity?.url;
      break;
    case "articles":
      slug = entity?.slug;
      break;
    default:
      slug = entity?.slug;
  }

  const url = `${baseUrl}?type=${supportedType?.type}&locale=${entity?.locale}&secret=${process.env.STRAPI_PREVIEW_SECRET}&slug=${slug}`;
  const publishedUrl = `${baseUrl}/?type=${supportedType?.type}&locale=${entity?.locale}&slug=${slug}`;

  return {
    draftUrl: url,
    publishedUrl: publishedUrl,
  };
}
