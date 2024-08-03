"use strict";

const {
  pick,
  pipe,
  has,
  prop,
  isNil,
  cloneDeep,
  isArray,
} = require("lodash/fp");

const { get, set, forEach, pickBy } = require("lodash");

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

  forEach(model.attributes, (attr, attrName) => {
    const value = entry[attrName];
    const oldValue = oldEntry?.[attrName] || null;
    if (attr.type === "dynamiczone" && isArray(value)) {
      value.forEach((compo) => {
        if (has("__component", compo)) {
          const oldCompo = oldValue?.find(c => c?.id === compo?.id && c?.__component === compo?.__component);
          const model = strapi.components[compo.__component];
          removeIdsMut(model, compo, oldCompo);
        }
      });
    } else if (attr.type === "component") {
      const model = strapi.components[attr.component];
      if (isArray(value)) {
        value.forEach((compo) => {
          const oldCompo = oldValue?.find(c => c?.id === compo?.id && c?.__component === compo?.__component);
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

const reduceArray = (arrayOfObjects) => {
  const resultMap = {};
  const resultArray = [];

  arrayOfObjects.forEach((obj) => {
    if (typeof obj === "string") {
      resultArray.push(obj);
      return;
    }
    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        if (!resultMap[key]) {
          resultMap[key] = [...new Set(obj[key])];
        } else {
          resultMap[key] = [...new Set([...resultMap[key], ...obj[key]])];
        }
      } else {
        resultMap[key] = obj[key];
      }
    }
  });

  for (const key in resultMap) {
    resultArray.push({ [key]: resultMap[key] });
  }

  return resultArray;
};

const generatePopulateStatement = (relations) => {
  const result = {};

  relations.forEach((item) => {
    if (typeof item === "object" && !Array.isArray(item)) {
      const key = Object.keys(item)[0];
      const innerObj = {};

      item[key].forEach((innerItem) => {
        if (typeof innerItem === "object") {
          const key = Object.keys(innerItem)[0];
          innerObj[key] = {
            populate: {},
          };
          innerItem[key].forEach((element) => {
            innerObj[key]["populate"][element] = true;
          });
        } else {
          innerObj[innerItem] = true;
        }
      });

      result[key] = { populate: innerObj };
    } else if (Array.isArray(item)) {
      const key = Object.keys(item)[0];
      const innerObj = {};

      item[key].forEach((innerItem) => {
        innerObj[innerItem] = true;
      });

      result[key] = { populate: innerObj };
    } else {
      result[item] = true;
    }
  });

  return result;
};

const getUpdatableRelations = (model) => {
  const result = [];
  const attributes = model?.attributes ?? [];

  for (const key in attributes) {
    if (
      attributes[key].type === "relation" &&
      attributes[key].target.startsWith("api::") &&
      key !== "versions" &&
      key !== "localizations"
    ) {
      result.push(key);
    }

    if (attributes[key].type === "dynamiczone") {
      for (const comp of attributes[key].components) {
        const model = strapi.getModel(comp);
        const relations = getUpdatableRelations(model);
        relations && result.push({ [key]: relations });
      }
    }
    if (attributes[key].type === "component") {
      const model = strapi.getModel(attributes[key].component);
      const relations = getUpdatableRelations(model);
      relations && result.push({ [key]: relations });
    }
  }

  return result;
};

const manageRelations = async (newData, uid, oldVersionId, model) => {
  if (!oldVersionId) {
    return newData;
  }

  const updatableRelations = reduceArray(getUpdatableRelations(model));

  const previousVersion = await strapi.entityService.findOne(uid, oldVersionId, { populate: model.__schema__.kind === "singleType" ? 'deep,3' : 'deep' });

  const mergeConnections = (newDataRel, prevRel) => {
    const newDataConnects = newDataRel?.connect || [];
    const newDataDisconnects = newDataRel?.disconnect || [];

    //Connect relations from previous version but only if they were not changed by user in the current version.
    const idsHandledByEditor = [
      ...newDataConnects.map((conn) => conn.id),
      ...newDataDisconnects.map((conn) => conn.id),
    ];

    const mergedConnects = [...newDataConnects];

    const prevRelIds = Array.isArray(prevRel)
      ? prevRel.map((rel) => rel.id)
      : [prevRel.id];
    prevRelIds.forEach((pid) => {
      if (!idsHandledByEditor.includes(pid)) {
        mergedConnects.push({ id: pid });
      }
    });

    return mergedConnects;
  };

  const updateRelations = (updatableRels, parent) => {
    const previous = get(previousVersion, parent, previousVersion);

    updatableRels.forEach((relation) => {
      if (typeof relation === "string") {
        if (previous) {
          if (!isArray(previous)) {
            const prevRel = previous[relation] ?? undefined;
            if (prevRel) {
              const newDataRel = parent
                ? get(newData, `${parent}.${relation}`, newData[relation])
                : newData[relation];
              const mergedConnects = mergeConnections(newDataRel, prevRel);

              // if (!get(connects, parent)) {
              //   set(connects, parent, [
              //     {
              //       ...get(newData, parent),
              //       ...pickBy(previous),
              //     },
              //   ]);
              // }
              // if (!parent) {
              //   connects[relation] = { connect: mergedConnects };
              //   return;
              // }
              // set(connects, `${parent}.${relation}`, {
              //   connect: mergedConnects,
              // });
            }
            return;
          }

          previous.forEach((prev, i) => {
            const prevRel = prev[relation] ?? undefined;

            if (prevRel) {
              const newDataRel = get(
                newData,
                `${parent}.${i}.${relation}`,
                newData[relation]
              );
              const mergedConnects = mergeConnections(newDataRel, prevRel);

              // if (!get(connects, parent)) {
              //   set(connects, parent, [
              //     {
              //       ...get(newData, `${parent}[${i}]`),
              //       ...pickBy(previous[i]),
              //     },
              //   ]);
              // }
              // set(connects, `${parent}.${i}.${relation}`, {
              //   connect: mergedConnects,
              // });
            }
          });
        }

        return;
      }

      Object.keys(relation).map((key) => {
        if (Array.isArray(relation[key])) {
          return updateRelations(
            relation[key],
            `${parent ? parent + "." : ""}${key}`
          );
        }
      });
    });
  };
  const connects = {};
  updateRelations(updatableRelations);
  return {
    ...newData,
    ...connects,
  };
};

const createNewVersion = async (modelUid, oldVersion, model, oldEntry) => {
  const modelDef = strapi.getModel(modelUid);
  // Remove timestamps
  ["createdAt", "updatedAt", "publishedAt"].forEach((ts) => {
    if (oldVersion[ts]) {
      delete oldVersion[ts];
    }
  });

  return removeIds(modelDef)(oldVersion, oldEntry);

  // return await manageRelations(
  //   removeIds(modelDef)(oldVersion, oldEntry),
  //   modelUid,
  //   oldVersion.id,
  //   model
  // );
};

module.exports = () => ({
  isVersionedContentType,
  createNewVersion,
  getVersionedAttributes,
  getNonVersionedAttributes,
  copyNonVersionedAttributes,
});
