"use strict";

const { getService } = require("../utils");
const _ = require("lodash");

/**
 * relation update middleware
 * @param {Ctx} ctx koa.js ctx object
 * @param {*} next next function
 * @returns
 */
const relationUpdateMiddleware = async (ctx, next) => {
  const { model, id } = ctx.request.params;
  const modelDef = strapi.getModel(model);
  if (
    !getService("content-types").isVersionedContentType(modelDef) ||
    modelDef.__schema__.kind === "singleType"
  ) {
    return next();
  }

  const entry = await strapi.entityService.findOne(model, id, { populate: '*' });
  const allVersionIds = await strapi.db.query(model).findMany({
    select: ["id"],
    where: {
      vuid: entry.vuid,
    },
  });
  const allVersionIdsNumbers = allVersionIds.map((id) => id.id);
  if (allVersionIdsNumbers.length < 2) {
    // there are no multiple version, no need to update relations
    return next();
  }
  //find all content types that might have relation to this content type
  const contentTypes = Object.entries(strapi.contentTypes);
  const components = strapi.components;
  const matchedComponents = Object.entries(components)
    .map(mappingFn(model))
    .flat();
  const matchedContentTypes = contentTypes
    .map(
      mappingFn(
        model,
        ({ name }) => name !== "localizations" && name !== "versions"
      )
    )
    .flat();

  const allLinkedComponents = [matchedComponents, matchedContentTypes].flat();

  //find all relations that point to one of available ids
  allLinkedComponents.forEach(findAndUpdateRelations(allVersionIdsNumbers, id, entry));
  return next();
};

function findAndUpdateRelations(allVersionIdsNumbers, id, entry) {
  return async (component) => {
    const populateQuery = {};
    const filtersQuery = { $or: [] };
    component.attributes.forEach((attr) => {
      populateQuery[attr.name] = {
        where: {
          id: {
            $in: allVersionIdsNumbers,
          },
        },
      };
      // Filter entries that include field with a relation to an older version of the newly created entity
      filtersQuery.$or.push({
        [attr.name]: { id: { $in: allVersionIdsNumbers } },
      });
    });
    const results = await strapi.query(component.key).findMany({
      populate: populateQuery,
      where: filtersQuery,
    });

    //update all content types to the latest published version
    results.forEach(async (result) => {
      await strapi.db.query(component.key).update({
        where: {
          id: result.id,
        },
        data: generateUpdateData(
          result,
          component.attributes,
          parseInt(id),
          allVersionIdsNumbers,
          entry,
        ),
      });
    });
  };
}

function mappingFn(model, additionalPredicate) {
  const predicate = _.matchesProperty("type", "relation");
  const targetPredicate = _.matchesProperty("target", model);
  return ([key, item]) => {
    let result = Object.entries(item.attributes)
      .filter(([aKey, value]) => predicate(value) && targetPredicate(value))
      .map(([akey, value]) => ({ name: akey, relationType: value.relation, mappedBy: value?.mappedBy || '', inversedBy: value?.inversedBy || '' }));
    if (typeof additionalPredicate === "function") {
      result = result.filter(additionalPredicate);
    }
    if (result.length === 0) {
      return [];
    } else {
      return {
        key: key,
        attributes: result,
      };
    }
  };
}

function generateUpdateData(result, attributes, id, allIds, entry) {
  const updateData = {};
  attributes.forEach((attr) => {
    if (attr.relationType !== 'manyToMany' && attr.relationType !== 'manyToOne') {
      let resultAttribute = result[attr.name];
      if (Array.isArray(resultAttribute)) {
        // Other entries can be related so only select older versions of the newly created entry.
        const otherVersionsOfEntry = resultAttribute
          .map((resu) => resu.id)
          .filter((resultId) => resultId !== id)
          .filter((resultId) => allIds.includes(resultId));
        if (attr.relationType === 'oneToMany' && attr.mappedBy && (!entry[attr.mappedBy] || entry[attr.mappedBy].id !== result.id)) {
          updateData[attr.name] = {
            disconnect: [id],
          }
        } else {
          updateData[attr.name] = {
            disconnect: otherVersionsOfEntry,
            connect: otherVersionsOfEntry.length ? [id] : [],
          };
        }
      } else if (resultAttribute && typeof resultAttribute === "object") {
        // This has to be checked because of the OR condition in the filters.
        const isCurrentRelationVersionOfEntry = allIds.includes(
          resultAttribute.id
        );
        updateData[attr.name] = {
          disconnect: isCurrentRelationVersionOfEntry ? [resultAttribute.id] : [],
          connect: isCurrentRelationVersionOfEntry ? [id] : [],
        };
      }
    }
  });
  return updateData;
}

module.exports = {
  relationUpdateMiddleware,
};
