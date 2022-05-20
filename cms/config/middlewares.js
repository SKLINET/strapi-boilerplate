module.exports = [
    "strapi::errors",
    {
        name: "strapi::security",
        config: {
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    "script-src": [
                        "'self'",
                        "*.tinymce.com",
                        "*.tiny.cloud",
                        "https:",
                    ],
                    "connect-src": [
                        "'self'",
                        "*.tinymce.com",
                        "*.tiny.cloud",
                        "blob:",
                    ],
                    "img-src": [
                        "'self'",
                        "*.tinymce.com",
                        "*.tiny.cloud",
                        "data:",
                        "blob:",
                    ],
                    "style-src": [
                        "'self'",
                        "'unsafe-inline'",
                        "*.tinymce.com",
                        "*.tiny.cloud",
                    ],
                    "font-src": ["'self'", "*.tinymce.com", "*.tiny.cloud"],
                    upgradeInsecureRequests: null,
                },
            },
        },
    },
    {
        name: "strapi::cors",
        config: {
            origin: [
                "http://localhost:1337",
                "http://localhost:3000",
                "http://localhost:8000",
            ],
        },
    },
    "strapi::poweredBy",
    "strapi::logger",
    "strapi::query",
    "strapi::body",
    "strapi::session",
    "strapi::favicon",
    "strapi::public",
];
