export default ({ env }) => ({
  publisher: {
    enabled: true,
  },
  "preview-button": {
    enabled: true,
    config: {
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
              pageId: "{documentId}",
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
              slug: "{url}",
              pageId: "{documentId}",
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
              itemId: "{documentId}",
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
              itemId: "{documentId}",
              locale: "{locale}",
            },
          },
        },
      ],
    },
  },
  seo: {
    enabled: true,
  },
  "record-locking": {
    enabled: true,
  },
  "video-field": {
    enabled: true,
  },
  "bold-title-editor": {
    enabled: true,
  },
  "content-tags": {
    enabled: true,
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
  tinymce: {
    enabled: true,
    config: {
      editor: {
        outputFormat: "html",
        tinymceSrc: "/tinymce/tinymce.min.js",
        editorConfig: {
          license_key: "gpl",
          language: "sk",
          inline_styles: true,
          height: 500,
          menubar: false,
          extended_valid_elements: "span, img, small",
          forced_root_block: "",
          convert_urls: false,
          entity_encoding: "raw",
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | styles | bold italic forecolor backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  media table emoticons visualblocks code|\
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
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
    },
  },
});
