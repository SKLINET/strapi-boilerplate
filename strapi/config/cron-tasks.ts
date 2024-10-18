import { prop } from "lodash/fp";

const hasVersionedOption = (modelOrAttribute) => {
  return prop("pluginOptions.versions.versioned", modelOrAttribute) === true;
};

const isVersionedContentType = (model) => {
  return hasVersionedOption(model);
};

export default {
  cleanVersions: {
    task: async ({ strapi }) => {
      const contentTypes = Object.values(strapi.contentTypes);
      const localesRes = await strapi.plugins.i18n.services.locales.find();
      const locales = localesRes.map((l: any) => l.code);

      for (const ct of contentTypes) {
        if (isVersionedContentType(ct)) {
          for (const lc of locales) {
            const idsToDelete = [];
            const allVersions = await strapi.db
              .query((ct as any).uid)
              .findMany({
                where: { publishedAt: { $null: true }, locale: { $eq: lc } },
                orderBy: { documentId: "desc" },
                limit: 20_000,
              });
            const vObject = {};

            if (Array.isArray(allVersions) && allVersions.length > 0) {
              for (const v of allVersions) {
                if (!vObject[v.vuid]) {
                  vObject[v.vuid] = 1;
                } else {
                  vObject[v.vuid] += 1;
                }
                if (vObject[v.vuid] > 5) {
                  idsToDelete.push(v.documentId);
                }
              }
              if (idsToDelete.length > 0) {
                await strapi.db.query((ct as any).uid).deleteMany({
                  where: {
                    documentId: {
                      $in: idsToDelete,
                    },
                  },
                });
              }
            }
          }
        }
      }
    },
    options: {
      rule: "0 0 * * *",
    },
  },
};
