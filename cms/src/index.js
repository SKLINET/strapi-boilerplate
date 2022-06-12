"use strict";

module.exports = {
    /**
     * An asynchronous register function that runs before
     * your application is initialized.
     *
     * This gives you an opportunity to extend code.
     */
    register({ strapi }) {
        const extensionService = strapi.plugin("graphql").service("extension");
        extensionService.use(({ nexus }) => {
            const pageQuery = nexus.extendType({
                type: "Query",
                auth: false,
                definition(t) {
                    t.field("findPage", {
                        type: "Page",
                        auth: false,
                        args: {
                            pattern: "String",
                            publicationState: "PublicationState",
                            locale: "String",
                        },
                        async resolve(parent, args) {
                            const { locale, publicationState, pattern } = args;
                            const data = await strapi.entityService.findMany(
                                "api::page.page",
                                {
                                    locale,
                                    publicationState:
                                        publicationState || "live",
                                }
                            );
                            for (const it of data) {
                                if (it?.url?.match(pattern)) {
                                    return it;
                                }
                            }
                            return null;
                        },
                    });
                },
            });
            const redirectQuery = nexus.extendType({
                type: "Query",
                auth: false,
                definition(t) {
                    t.field("findRedirect", {
                        type: "Redirect",
                        auth: false,
                        args: {
                            redirectFrom: "String",
                            publicationState: "PublicationState",
                        },
                        async resolve(parent, args) {
                            const { publicationState, redirectFrom } = args;
                            const data = await strapi.entityService.findMany(
                                "api::redirect.redirect",
                                {
                                    filters: {
                                        redirectFrom,
                                    },
                                    publicationState:
                                        publicationState || "live",
                                }
                            );
                            for (const it of data) {
                                if (it?.url?.match(pattern)) {
                                    return it;
                                }
                            }
                            return null;
                        },
                    });
                },
            });

            const onePageQuery = nexus.extendType({
                type: "Query",
                auth: false,
                definition(t) {
                    t.field("page", {
                        type: "Page",
                        auth: false,
                        args: {
                            pattern: "String",
                            publicationState: "PublicationState",
                            locale: "String",
                        },
                        async resolve(parent, args) {
                            const { locale, publicationState, pattern } = args;
                            const data = await strapi.entityService.findMany(
                                "api::page.page",
                                {
                                    locale,
                                    pattern,
                                    publicationState:
                                        publicationState || "live",
                                }
                            );
                            for (const it of data) {
                                if (it?.url?.match(pattern)) {
                                    return it;
                                }
                            }
                            return null;
                        },
                    });
                },
            });
            const oneArticleQuery = nexus.extendType({
                type: "Query",
                auth: false,
                definition(t) {
                    t.field("article", {
                        type: "Article",
                        auth: false,
                        args: {
                            slug: "String",
                            publicationState: "PublicationState",
                            locale: "String",
                        },
                        async resolve(parent, args) {
                            const { locale, publicationState, slug } = args;
                            const data = await strapi.entityService.findMany(
                                "api::article.article",
                                {
                                    locale,
                                    slug,
                                    publicationState:
                                        publicationState || "live",
                                }
                            );
                            for (const it of data) {
                                if (it?.url?.match(pattern)) {
                                    return it;
                                }
                            }
                            return null;
                        },
                    });
                },
            });

            return {
                types: [
                    pageQuery,
                    redirectQuery,
                    onePageQuery,
                    oneArticleQuery,
                ],
                resolversConfig: {
                    "Query.findPage": {
                        auth: false,
                    },
                    "Query.page": {
                        auth: false,
                    },
                    "Query.article": {
                        auth: false,
                    },
                    "Query.findRedirect": {
                        auth: false,
                    },
                    "Query.findSlug": {
                        auth: false,
                    },
                },
            };
        });
    },

    /**
     * An asynchronous bootstrap function that runs before
     * your application gets started.
     *
     * This gives you an opportunity to set up your data model,
     * run jobs, or perform some special logic.
     */
    bootstrap({ strapi }) {},
};
