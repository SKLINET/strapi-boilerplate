module.exports = {
    resetPassword: async (ctx) => {
        try {
            const { body } = ctx.request;
            ctx.body = strapi
                .plugin("email-template-connector")
                .service("reset")
                .resetPassword(body);
        } catch (err) {
            ctx.body = err;
            ctx.throw(500, err);
        }
    },
};
