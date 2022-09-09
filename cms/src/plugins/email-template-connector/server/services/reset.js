"use strict";

module.exports = ({ strapi }) => ({
    async resetPassword(data) {
        if (data) {
            try {
                await strapi
                    .plugin("email-designer")
                    .service("email")
                    .sendTemplatedEmail(
                        {
                            // required
                            to: data.email,
                            // optional if /config/plugins.js -> email.settings.defaultFrom is set
                            from: "boilerplate@example.com",
                            // optional if /config/plugins.js -> email.settings.defaultReplyTo is set
                            replyTo: "boilerplate@example.com",
                            // optional array of files
                            attachments: [],
                        },
                        {
                            // required - Ref ID defined in the template designer (won't change on import)
                            templateReferenceId: 1,

                            // If provided here will override the template's subject.
                            // Can include variables like `Thank you for your order {{= USER.firstName }}!`
                            subject: `${data.name}, your password reset link is ready.`,
                        },
                        {
                            // this object must include all variables you're using in your email template
                            USER: {
                                firstName: data.name,
                                email: data.email,
                            },
                        }
                    );
            } catch (err) {
                strapi.log.debug("📺: ", err);
                return ctx.badRequest(null, err);
            }
        }
    },
});
