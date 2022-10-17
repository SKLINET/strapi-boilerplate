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
    let pageId;
    let itemId;
    switch (supportedType?.type) {
        case "pages":
            slug = entity?.url;
            pageId = entity.id;
            break;
        case "articles":
            slug = entity?.slug;
            itemId = entity.id;
            break;
        default:
            slug = entity?.slug;
    }

    const url = `${baseUrl}?type=${supportedType?.type}&locale=${
        entity?.locale
    }&secret=${process.env.STRAPI_PREVIEW_SECRET}&slug=${slug}${
        pageId ? `&pageId=${pageId}` : ""
    }${itemId ? `&itemId=${itemId}` : ""}`;
    const publishedUrl = `${baseUrl}/?type=${supportedType?.type}&locale=${
        entity?.locale
    }&slug=${slug}${pageId ? `&pageId=${pageId}` : ""}${
        itemId ? `&itemId=${itemId}` : ""
    }`;

    return {
        draftUrl: url,
        publishedUrl: publishedUrl,
    };
}
