import type { Core } from "@strapi/strapi";
import slugify from "slugify";

/**
 * Auto generate slug hook
 * Automatically generates unique slugs for content types with slug field
 */
export const autoGenerateSlug = (strapi: Core.Strapi) => {
  const modelsWithSlug = {
    'api::article.article': 'title',
  };

  const slugifyOptions = {
    lower: true,
    remove: /[*+~,.()'"!:@#?]/g,
  }

  strapi.documents.use(async (context, next) => {
    const slugAlreadyPresent = async (slug: string, context: any) => {
      const elements = await strapi.documents(context.uid).findMany({
        locale: context.params.locale,
        filters: {
          slug: {
            $eq: slug
          }
        }
      });

      const filteredElements = elements.filter((element: any) => {
        return element.documentId != context.params.documentId
      })
      return filteredElements.length > 0;
    };

    if (!Object.keys(modelsWithSlug).includes(context.uid)) {
      return next();
    }

    if (['create', 'update'].includes(context.action)) {
      const data = (context?.params as any)?.data;
      // if (data?.slug) {
      //   return next();
      // }
      const field = modelsWithSlug[context.uid];
      const initialSlug = slugify(data?.[field], slugifyOptions);

      let i = 1;
      let generatedSlug = initialSlug;
      let present = await slugAlreadyPresent(generatedSlug, context)

      while (present) {
        generatedSlug = slugify(`${initialSlug} ${i}`, slugifyOptions);
        present = await slugAlreadyPresent(generatedSlug, context);
        i++;
      }

      (context.params as any).data.slug = generatedSlug;
    }

    return next();
  });
};

