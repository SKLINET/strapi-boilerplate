import sk from "./extensions/translations/sk.json";
import cs from "./extensions/translations/cs.json";

export default {
    config: {
        locales: ["cs", "sk"],
        translations: {
            sk: sk,
            cs: cs,
        },
        tutorials: false,

        notifications: { releases: false },
    },
  bootstrap(app: any) {
    console.log(app);
  },
};
