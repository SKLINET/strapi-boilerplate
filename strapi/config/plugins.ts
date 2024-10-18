export default ({ env }) => ({
  seo: {
    enabled: true,
  },
  "record-locking": {
    enabled: true,
  },
  publisher: {
    enabled: true,
    resolve: "./src/plugins/publisher",
  },
  "video-field": {
    enabled: true,
    resolve: "./src/plugins/video-field",
  },
  "bold-title-editor": {
    enabled: true,
    resolve: "./src/plugins/bold-title-editor",
  },
  "content-tags": {
    enabled: true,
    resolve: "./src/plugins/content-tags",
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
    resolve: "./src/plugins/tinymce",
    config: {
      editor: {
        outputFormat: "html",
        editorConfig: {
          language: "sk",
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
});
