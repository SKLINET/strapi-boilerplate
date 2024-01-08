"use strict";

const _ = require("lodash");
const {
  pick,
  pipe,
  has,
  prop,
  isNil,
  cloneDeep,
  isArray,
} = require("lodash/fp");
const get = require("lodash/get");
const {
  isRelationalAttribute,
  getVisibleAttributes,
  isMediaAttribute,
  isTypedAttribute,
} = require("@strapi/utils").contentTypes;

const hasVersionedOption = (modelOrAttribute) => {
  return prop("pluginOptions.versions.versioned", modelOrAttribute) === true;
};

/**
 * Returns whether an attribute is versioned or not
 * @param {*} attribute
 * @returns
 */
const isVersionedAttribute = (model, attributeName) => {
  const attribute = model.attributes[attributeName];

  return (
    hasVersionedOption(attribute) ||
    (isRelationalAttribute(attribute) && !isMediaAttribute(attribute)) ||
    isTypedAttribute(attribute, "uid")
  );
};

/**
 * Returns whether a model is versioned or not
 * @param {*} model
 * @returns
 */
const isVersionedContentType = (model) => {
  return hasVersionedOption(model);
};

/**
 * Returns the list of attribute names that are not versioned
 * @param {object} model
 * @returns {string[]}
 */
const getNonVersionedAttributes = (model) => {
  return getVisibleAttributes(model).filter(
    (attributeName) => !isVersionedAttribute(model, attributeName)
  );
};

const removeId = (value) => {
  if (typeof value === "object" && (has("id", value) || has("_id", value))) {
    delete value.id;
    delete value._id;
  }
};

const removeIds = (model) => (entry, oldEntry) => removeIdsMut(model, cloneDeep(entry), oldEntry);

const arrayMove = (arr, fromIndex, toIndex) => {
  const element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}

const removeIdsMut = (model, entry, oldEntry) => {
  if (isNil(entry)) {
    return entry;
  }

  removeId(entry);

  _.forEach(model.attributes, (attr, attrName) => {
    const value = entry[attrName];
    const oldValue = oldEntry?.[attrName] || null;
    if (attr.type === "dynamiczone" && isArray(value)) {
      value.forEach((compo) => {
        if (has("__component", compo)) {
          const oldCompo = oldValue?.find(c => c?.id === compo?.id);
          const model = strapi.components[compo.__component];
          removeIdsMut(model, compo, oldCompo);
        }
      });
    } else if (attr.type === "component") {
      const model = strapi.components[attr.component];
      if (isArray(value)) {
        value.forEach((compo) => {
          const oldCompo = oldValue?.find(c => c?.id === compo?.id);
          return removeIdsMut(model, compo, oldCompo)
        });
      } else {
        removeIdsMut(model, value, oldValue);
      }
    } else if (attr.type === "relation") {
      if (value) {
        if (isArray(value)) {
          entry[attrName] = oldValue?.map(v => v?.id || v) || value.map((r) => get(r, "id", r)) || [];
        } else {
          const oldVal = Array.isArray(oldValue) ? oldValue?.map(v => v?.id || v) : oldValue?.id || null;
          if (Array.isArray(value?.disconnect)) {
            const disconnectIds = value.disconnect.map(d => d?.id || d) || [];
            if (Array.isArray(oldVal)) {
              const newVals = value?.connect?.map(c => c?.id || c) || [];
              oldVal.map(o => {
                if (disconnectIds.indexOf(o) === -1 && newVals.indexOf(o) === -1) {
                  newVals.push(o);
                }
              })
              for (let i = 0; i < value.connect.length; i++) {
                const f = value?.connect[i];
                if (f?.position) {
                  const fromIndex = newVals.indexOf(f.id);
                  const toIndex = f.position.end ? newVals.length : newVals.indexOf(f.position.before);
                  arrayMove(newVals, fromIndex, toIndex - 1);
                }
              }
              entry[attrName] = { connect: newVals?.map(v => ({ id: v })) };
            } else {
              if (oldVal) {
                if (disconnectIds.indexOf(oldVal) === -1) {
                  entry[attrName] = {connect: [{id: oldVal}]};
                }
              } else {
                entry[attrName] = value;
              }
            }
          }
        }
      }
    }
  });

  return entry;
};

/**
 * Returns a copy of an entry picking only its non versioned attributes
 * @param {object} model
 * @param {object} entry
 * @returns {object}
 */
const copyNonVersionedAttributes = (model, entry) => {
  const nonVersionedAttributes = getNonVersionedAttributes(model);

  return pipe(pick(nonVersionedAttributes), removeIds(model))(entry);
};

/**
 * Returns the list of attribute names that are versioned
 * @param {object} model
 * @returns {string[]}
 */
const getVersionedAttributes = (model) => {
  return getVisibleAttributes(model).filter((attributeName) =>
    isVersionedAttribute(model, attributeName)
  );
};

const createNewVersion = (modelUid, oldVersion, oldEntry) => {
  const modelDef = strapi.getModel(modelUid);
  // Remove timestamps
  ["createdAt", "updatedAt", "publishedAt"].forEach((ts) => {
    if (oldVersion[ts]) {
      delete oldVersion[ts];
    }
  })

  return removeIds(modelDef)(oldVersion, oldEntry);
};

module.exports = () => ({
  isVersionedContentType,
  createNewVersion,
  getVersionedAttributes,
  getNonVersionedAttributes,
  copyNonVersionedAttributes,
});
