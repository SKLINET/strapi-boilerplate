export default ({ env }) => {
  const clientUrl = env("CLIENT_URL");
  const previewSecret = env("PREVIEW_SECRET");

  return {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "643bb60958200c3451b23bb9ed043dd8"),
    },
    apiToken: {
      salt: env("API_TOKEN_SALT", "d9b0df66ff97a666027e665707b4e3e7"),
    },
    transfer: {
      token: {
        salt: env("TRANSFER_TOKEN_SALT", "d9b0df66ff97a666027e665707b4e3e7"),
      },
    },
    watchIgnoreFiles: ["**/config/sync/**"],
    flags: {
      nps: env.bool("FLAG_NPS", true),
      promoteEE: env.bool("FLAG_PROMOTE_EE", true),
    },
    preview: {
      enabled: true,
      config: {
         allowedOrigins: [clientUrl],
         async handler(uid, { documentId, locale, status }) {
            switch (uid) {
               case 'api::article.article':
               case 'api::page.page': {
                  const document = await strapi.documents(uid).findOne({ documentId, locale, status });

                  // Use Next.js draft mode
                  const urlSearchParams = new URLSearchParams({
                     type: uid,
                     slug: document?.slug || document?.url,
                     locale: locale,
                     secret: previewSecret,
                     status,
                  });

                  return `${clientUrl}/api/preview?${urlSearchParams}`;
               }
               default:
                  return null;
            }
         },
      },
   },
  };
};
