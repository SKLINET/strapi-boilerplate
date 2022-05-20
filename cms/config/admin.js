module.exports = ({ env }) => ({
    apiToken: {
        salt: env("API_TOKEN_SALT", "d9b0df66ff97a666027e665707b4e3e7"),
    },
    auth: {
        secret: env("ADMIN_JWT_SECRET", "643bb60958200c3451b23bb9ed043dd8"),
    },
});
