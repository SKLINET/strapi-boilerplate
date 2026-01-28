import type { Core } from "@strapi/strapi";

/**
 * Auto change publish date hook
 * Automatically updates the publishDate field when creating or updating articles
 */
export const autoChangePublishDate = (strapi: Core.Strapi) => {
  strapi.documents.use(async (context, next) => {
    if (context.uid !== "api::article.article") {
      return next();
    }

    if (['create', 'update'].includes(context.action)) {
      (context.params as any).data.publishDate = new Date().toISOString();
    }

    return next();
  });
};

