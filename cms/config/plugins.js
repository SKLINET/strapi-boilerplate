module.exports = ({ env }) => ({
    slugify: {
        enabled: false,
        config: {
            contentTypes: {
                article: {
                    field: "slug",
                    references: "title",
                },
                product: {
                    field: "slug",
                    references: "name",
                },
                "product-category": {
                    field: "slug",
                    references: "name",
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
            contentTypes: [
                {
                    uid: "api::page.page",
                    targetField: "slug",
                },
                {
                    uid: "api::article.article",
                    targetField: "slug",
                },
            ],
        },
    },
    "content-versioning": {
        enabled: true,
    },
    "email-designer": {
        enabled: false,
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
