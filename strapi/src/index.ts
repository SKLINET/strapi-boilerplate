import type { Core } from "@strapi/strapi";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    const extensionService = strapi.plugin("graphql").service("extension");

    extensionService.use(({ nexus }) => {
      const pageQuery = nexus.extendType({
        type: "Query",
        auth: false,
        definition(t) {
          t.field("findPage", {
            type: "Page",
            auth: false,
            args: {
              pattern: "String",
              status: "PublicationStatus",
              locale: "String",
            },
            async resolve(parent, args) {
              const { locale, status, pattern } = args;

              // This is the original code from the query

              return null;
            },
          });
        },
      });
      const redirectQuery = nexus.extendType({
        type: "Query",
        auth: false,
        definition(t) {
          t.field("findRedirect", {
            type: "Redirect",
            auth: false,
            args: {
              redirectFrom: "String",
              status: "PublicationStatus",
            },
            async resolve(parent, args) {
              const { status, redirectFrom } = args;

              // This is the original code from the query

              return null;
            },
          });
        },
      });

      const onePageQuery = nexus.extendType({
        type: "Query",
        auth: false,
        definition(t) {
          t.field("page", {
            type: "Page",
            auth: false,
            args: {
              pattern: "String",
              status: "PublicationStatus",
              locale: "String",
              entityId: "Int",
            },
            async resolve(parent, args) {
              const { locale, status, pattern, entityId } = args;

              // This is the original code from the query

              return null;
            },
          });
        },
      });

      return {
        types: [pageQuery, redirectQuery, onePageQuery],
        resolversConfig: {
          "Query.findPage": {
            auth: false,
          },
          "Query.page": {
            auth: false,
          },
          "Query.findRedirect": {
            auth: false,
          },
          "Query.findSlug": {
            auth: false,
          },
          "Query.sendEmail": {
            auth: false,
          },
        },
      };
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }: { strapi: Core.Strapi }) {},
};
