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
                        type: "PageEntity",
                        auth: false,
                        args: {
                            pattern: "String",
                            publicationState: "PublicationState",
                            locale: "String",
                            entityId: "Int",
                        },
                        async resolve(parent, args) {
                            const {
                                locale,
                                publicationState,
                                pattern,
                                entityId,
                            } = args;

                            let data;
                            if (entityId) {
                                data = await strapi.entityService.findOne(
                                    "api::page.page",
                                    entityId,
                                    {
                                        locale,
                                        publicationState:
                                            publicationState || "LIVE",
                                    }
                                );
                                return data;
                            } else {
                                data = await strapi.entityService.findMany(
                                    "api::page.page",
                                    {
                                        locale,
                                        publicationState:
                                            publicationState || "LIVE",
                                    }
                                );
                            }

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
            const sendTemplatedEmail = nexus.extendType({
                type: "Query",
                auth: false,
                definition(t) {
                    t.field("sendEmail", {
                        type: "Boolean",
                        auth: false,
                        args: {
                            emailTo: "String",
                            emailTemplate: "Int",
                            email: "String",
                            firstName: "String",
                        },

                        async resolve(parent, args) {
                            const { emailTo, emailTemplate, email, firstName } =
                                args;
                            if (args) {
                                try {
                                    await strapi
                                        .plugin("email-designer")
                                        .service("email")
                                        .sendTemplatedEmail(
                                            { to: emailTo },
                                            {
                                                templateReferenceId:
                                                    emailTemplate,
                                            },
                                            {
                                                email,
                                                firstName,
                                            }
                                        );

                                    return true;
                                } catch (err) {
                                    console.log(err);
                                    return false;
                                }
                            } else return false;
                        },
                    });
                },
            });

            return {
                types: [
                    pageQuery,
                    redirectQuery,
                    onePageQuery,
                    sendTemplatedEmail,
                ],
                resolversConfig: {
                    "Query.findPage": {
                        auth: false,
                    },
                    "Query.page": {
                        auth: false,
                    },
                    "Query.findRedirect": {
                        auth: false,
                    },
                    "Query.findSlug": {
                        auth: false,
                    },
                    "Query.sendEmail": {
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
