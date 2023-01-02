module.exports = ({ env }) => ({
    slugify: {
        enabled: true,
        config: {
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
    email: {
        enabled: true,
        provider: "nodemailer",
        providerOptions: {
            host: env("SMTP_HOST", "smtp.example.com"),
            port: env("SMTP_PORT", 587),
            auth: {
                user: env("SMTP_USERNAME"),
                pass: env("SMTP_PASSWORD"),
            },
            // ... any custom nodemailer options
        },
        settings: {
            defaultFrom: "no-reply@boilerplate.sk",
            defaultReplyTo: "no-reply@boilerplate.sk",
        },
    },
    transformer: {
        enabled: true,
        config: {
            prefix: "/api/",
            responseTransforms: {
                removeAttributesKey: true,
                removeDataKey: true,
            },
        },
    },
    "preview-button": {
        enabled: true,
        openTarget: "_blank",
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
    },
    "email-designer": {
        enabled: true,
    },
    navigation: {
        enabled: false,
    },
    seo: {
        enabled: true,
    },
    tinymce: {
        enabled: true,
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
    i18n: {
        enabled: true,
    },
    "video-field": {
        enabled: true,
    },
});
