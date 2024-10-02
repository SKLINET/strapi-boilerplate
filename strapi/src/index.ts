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

              const variables: Record<string, any> = {
                locale,
                status: status || "PUBLISHED",
              };

              const data = await strapi.entityService.findMany(
                "api::page.page",
                variables
              );

              for (const it of data) {
                if (it?.url?.match(pattern)) {
                  return it;
                }
              }

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

              const data = await strapi.entityService.findMany(
                "api::redirect.redirect",
                {
                  filters: {
                    redirectFrom,
                  },
                  status: status || "PUBLISHED",
                }
              );

              for (const it of data) {
                if (it?.redirectFrom?.match(redirectFrom)) {
                  return it;
                }
              }

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

              let data;
              if (entityId) {
                data = await strapi.entityService.findMany("api::page.page", {
                  filters: {
                    id: entityId,
                  },
                  locale,
                  limit: 1,
                  status: status || "PUBLISHED",
                });
                return data;
              } else {
                const variables: Record<string, any> = {
                  locale,
                  limit: 9999,
                  status: status || "PUBLISHED",
                };
                if (status?.toLowerCase() === "published") {
                  variables.versions = "all";
                }
                data = await strapi.entityService.findMany(
                  "api::page.page",
                  variables
                );
              }

              for (const it of data) {
                if (it?.url?.match(pattern)) {
                  return it;
                }
              }

              return null;
            },
          });
        },
      });

      const findArticleBySlugQuery = nexus.extendType({
        type: "Query",
        auth: false,
        definition(t) {
          t.field("findArticleBySlug", {
            type: "Article",
            auth: false,
            args: {
              slug: "String",
              locale: "String",
              status: "PublicationStatus",
            },
            async resolve(parent, args) {
              const { slug, locale, status } = args;

              const variables: Record<string, any> = {
                filters: {
                  slug: slug,
                },
                locale,
                status: status || "PUBLISHED",
              };

              const data = await strapi.entityService.findMany(
                "api::article.article",
                variables
              );

              return data[0];
            },
          });
        },
      });

      return {
        types: [pageQuery, redirectQuery, onePageQuery, findArticleBySlugQuery],
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
          "Query.findArticleBySlug": {
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
