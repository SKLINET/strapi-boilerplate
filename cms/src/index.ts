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

              const data = await strapi.documents("api::page.page").findMany({
                locale,
                status: status || "published",
              });

              const page = data.find((it) => it?.url?.match(pattern));

              if (!page) return null;

              if (status?.toLowerCase() === "draft") {
                const publishedPage = await strapi
                  .documents("api::page.page")
                  .findFirst({
                    filters: {
                      documentId: page.documentId,
                    },
                    locale: locale,
                    status: "published",
                  });

                // If draft page is the same as the published page
                if (
                  publishedPage &&
                  publishedPage.updatedAt === page.updatedAt
                ) {
                  // Return published page in preview mode
                  return publishedPage;
                }
              }

              return page;
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

              const data = await strapi
                .documents("api::redirect.redirect")
                .findMany({
                  filters: {
                    redirectFrom,
                  },
                  status: status || "published",
                });

              const redirect = data.find((it) =>
                it?.redirectFrom?.match(redirectFrom)
              );

              if (!redirect) return null;

              if (status?.toLowerCase() === "draft") {
                const publishedRedirect = await strapi
                  .documents("api::redirect.redirect")
                  .findFirst({
                    filters: {
                      documentId: redirect.documentId,
                    },
                    status: "published",
                  });

                // If draft redirect is the same as the published redirect
                if (
                  publishedRedirect &&
                  publishedRedirect.updatedAt === redirect.updatedAt
                ) {
                  // Return published redirect in preview mode
                  return publishedRedirect;
                }
              }

              return redirect;
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
            },
            async resolve(parent, args) {
              const { locale, status, pattern } = args;

              const variable: Record<string, any> = {
                locale,
                limit: 9999,
                status: status || "published",
              };

              const data = await strapi
                .documents("api::page.page")
                .findMany(variable);

              const page = data.find((it) => it?.url?.match(pattern));

              if (!page) return null;

              if (status?.toLowerCase() === "draft") {
                const publishedPage = await strapi
                  .documents("api::page.page")
                  .findFirst({
                    filters: {
                      documentId: page.documentId,
                    },
                    locale: locale,
                    status: "published",
                  });

                // If draft page is the same as the published page
                if (
                  publishedPage &&
                  publishedPage.updatedAt === page.updatedAt
                ) {
                  // Return published page in preview mode
                  return publishedPage;
                }
              }

              return page;
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

              const article = await strapi
                .documents("api::article.article")
                .findFirst({
                  filters: {
                    slug: slug,
                  },
                  locale: locale,
                  status: status || "published",
                });

              if (status?.toLowerCase() === "draft") {
                const publishedArticle = await strapi
                  .documents("api::article.article")
                  .findFirst({
                    filters: {
                      slug: slug,
                    },
                    locale: locale,
                    status: "published",
                  });

                // If draft article is the same as the published article
                if (
                  publishedArticle &&
                  publishedArticle.updatedAt === article.updatedAt
                ) {
                  // Return published article in preview mode
                  return publishedArticle;
                }
              }

              return article;
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
