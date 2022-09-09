module.exports = {
    type: "admin",
    routes: [
        {
            method: "POST",
            path: "/reset/password",
            handler: "reset.resetPassword",
            config: {
                policies: [],
                auth: false,
            },
        },
    ],
};
