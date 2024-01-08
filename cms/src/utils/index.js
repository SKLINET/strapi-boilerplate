const _ = require("lodash");

function noThirdPartyPing() {
    return process.env.NO_THIRD_PARTY_PING === "true";
}

/** Given an Object, recursively finds lodash paths of all its leaf attributes. */
function paths(obj, stack = []) {
    if (!_.isPlainObject(obj)) {
        return [];
    }

    return Object.entries(obj).flatMap(([key, value]) => {
        if (_.isPlainObject(value)) {
            return paths(value, [...stack, key]);
        }
        return [[...stack, key].join(".")];
    });
}


module.exports = {
    noThirdPartyPing,
    paths,
};
