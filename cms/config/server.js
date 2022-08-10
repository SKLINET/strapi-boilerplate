module.exports = ({ env }) => ({
    host: env("HOST", "localhost"),
    port: env.int("PORT", 1337),
    app: {
        keys: env.array("APP_KEYS"),
    },
});
