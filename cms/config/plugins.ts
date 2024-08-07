module.exports = ({ env }) => ({
  slugify: {
    enabled: true,
    resolve: "./src/plugins/slugify",
    config: {
      shouldUpdateSlug: true,
      slugifyWithCount: true,
      contentTypes: {
        article: {
          field: "slug",
          references: "title",
        },
      },
    },
  },
  graphql: {
    config: {
      apolloServer: {
        introspection: true,
      },
      defaultLimit: 100,
      maxLimit: -1,
      playgroundAlways: true,
    },
  },
  "preview-button": {
    enabled: true,
    openTarget: "_blank",
    config: {
      injectListViewColumn: false,
      contentTypes: [
        {
          uid: "api::page.page",
          draft: {
            url: env(
              "STRAPI_PREVIEW_DRAFT_URL",
              "http://localhost:3000/api/preview"
            ),
            query: {
              type: "pages",
              slug: "{url}",
              pageId: "{id}",
              locale: "{locale}",
            },
          },
          published: {
            url: env(
              "STRAPI_PREVIEW_PUBLISHED_URL",
              "http://localhost:3000/api/preview"
            ),
            query: {
              type: "pages",
              slug: "{slug}",
              pageId: "{id}",
              locale: "{locale}",
            },
          },
        },
        {
          uid: "api::article.article",
          draft: {
            url: env(
              "STRAPI_PREVIEW_DRAFT_URL",
              "http://localhost:3000/api/preview"
            ),
            query: {
              type: "articles",
              slug: "{slug}",
              itemId: "{id}",
              locale: "{locale}",
            },
          },
          published: {
            url: env(
              "STRAPI_PREVIEW_PUBLISHED_URL",
              "http://localhost:3000/api/preview"
            ),
            query: {
              type: "articles",
              slug: "{slug}",
              itemId: "{id}",
              locale: "{locale}",
            },
          },
        },
      ],
    },
  },
  "content-versioning": {
    enabled: true,
    resolve: "./src/plugins/content-versioning",
  },
  "email-designer": {
    enabled: false,
  },
  "video-field": {
    enabled: true,
  },
  seo: {
    enabled: true,
  },
  "strapi-plugin-populate-deep": {
    config: {
      defaultDepth: 4,
    },
  },
  tinymce: {
    enabled: true,
    config: {
      editor: {
        outputFormat: "html",
        tinymceSrc: '/tinymce/tinymce.min.js',
        editorConfig: {
          license_key: 'gpl',
          language: "cs",
          inline_styles: true,
          height: 500,
          menubar: false,
          valid_elements: "*[*]",
          // extended_valid_elements: "span, img, small",
          forced_root_block: false,
          convert_urls: false,
          entity_encoding: "raw",
          plugins:
            "advlist autolink lists link image charmap preview anchor \
            searchreplace visualblocks code fullscreen table emoticons nonbreaking \
            insertdatetime media table code help wordcount",
          toolbar:
            "undo redo | styles | bold italic forecolor backcolor | \
            alignleft aligncenter alignright alignjustify | \
            table emoticons visualblocks code|\
            nonbreaking bullist numlist outdent indent | removeformat | help",
          style_formats: [
            {
              title: "Headings",
              items: [
                { title: "h1", block: "h1" },
                { title: "h2", block: "h2" },
                { title: "h3", block: "h3" },
                { title: "h4", block: "h4" },
                { title: "h5", block: "h5" },
                { title: "h6", block: "h6" },
              ],
            },

            {
              title: "Text",
              items: [
                { title: "Paragraph", block: "p" },
                {
                  title: "Paragraph with small letters",
                  block: "small",
                },
              ],
            },
          ],
        },
      },
    },
  },
  publisher: {
    enabled: false,
  },
  i18n: {
    enabled: true,
  },
  upload: {
    config: {
      provider: "cloudinary",
    },
  },
  cloudinary: {
    enabled: true,
    resolve: "./src/plugins/cloudinary",
    config: {
      cloud_name: env("CLOUDINARY_NAME"),
      api_key: env("CLOUDINARY_KEY"),
      api_secret: env("CLOUDINARY_SECRET"),
    },
  },
});
