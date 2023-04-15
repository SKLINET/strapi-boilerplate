import sk from "./extensions/translations/sk.json";
import cs from "./extensions/translations/sk.json";
import logo from "./extensions/assets/logo.svg";

export default {
    config: {
        locales: ["cs", "sk"],
        translations: {
            sk: sk,
            cs: cs,
        },
        tutorials: false,

        notifications: { release: false },

        auth: {
            logo: logo,
        },

        // head: {
        //     favicon: favicon,
        // },
        //
        // menu: {
        //     logo: menuLogo,
        // },

        theme: {
            colors: {
                // primary100: "#E6FAFA",
                // primary200: "#E6FAFA",
                // primary500: "#00CCCB",
                // primary600: "#00CCCB",
                // primary700: "#00CCCB",
                // danger700: "#b72b1a",
            },
        },
    },
    bootstrap(app) {},
};
