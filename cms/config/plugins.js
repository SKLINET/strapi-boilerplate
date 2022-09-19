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
        config: {
            baseUrl: process.env.STRAPI_PREVIEW_URL,
            contentTypes: [
                {
                    uid: "api::page.page",
                    targetField: "url",
                    type: "pages",
                },
                {
                    uid: "api::article.article",
                    targetField: "slug",
                    type: "articles",
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
    wysiwyg: {
        enabled: true,
        resolve: "./src/plugins/wysiwyg",
    },
    i18n: {
        enabled: true,
    },
});
