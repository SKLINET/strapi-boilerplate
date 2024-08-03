"use strict";
const { v4: uuid } = require("uuid");
const { lowerCase, startCase } = require("lodash/fp");
const {
  getService,
  isLocalizedContentType,
  getLatestRawQuery,
} = require("../utils");
const _ = require("lodash");
const { getLatestValueByDB } = require("../utils");

const VERSIONS_QUERY_FILTER = "versions";

// TODO: Test query efficiency for larger datasets
const findLatestInLocale = async (model, fields) => {
  const where = ["vuid=a.vuid"];

  const mapColumnToField = {};
  const cols = fields.map((field) => {
    const dbColumn = `${startCase(field).split(" ").map(lowerCase).join("_")}`;
    mapColumnToField[dbColumn] = field;
    return "a." + dbColumn;
  });

  // TODO: Localizations also apply decorator which strips all except main locale entity
  //  $and: [{ locale: await getDefaultLocale() }].concat(params.filters || []),
  if (isLocalizedContentType(model)) {
    cols.push("a.locale");
    where.push("locale=a.locale");
  }
  const rawQuery = `SELECT ${cols.join(", ")}
        FROM ${model.collectionName} a WHERE NOT EXISTS (
            SELECT 1 FROM ${model.collectionName} WHERE ${where.join(
    " AND "
  )} AND (
                CASE WHEN a.published_at is null THEN (
                    published_at is not null OR version_number > a.version_number
                )
                ELSE published_at is not null AND version_number > a.version_number
                END
            )
        )`;

  const result = await strapi.db.connection.raw(rawQuery);
  if (result?.rows) {
    return result?.rows.map((row) => {
      const entity = {};
      for (const col in mapColumnToField) {
        entity[mapColumnToField[col]] = row[col] ?? null;
      }
      return entity;
    });
  }
  return [];
};

/**
 * Decorates the entity service with Content Versioning logic
 * As decorator API passes into official Strapi support, could move most logic here
 * @param {object} service - entity service
 */
const decorator = (service) => ({
  /**
   * Wraps query options. For versioned models display only published/newest versions
   * @param {object} opts - Query options object (params, data, files, populate)
   * @param {object} ctx - Query context
   * @param {object} ctx.model - Model that is being used
   */
  async wrapParams(params = {}, ctx = {}) {
    const { isVersionedContentType } = getService("content-types");
    const model = strapi.getModel(ctx.uid);
    const wrappedParams = await service.wrapParams.call(this, params, ctx);

    // Optional override with VERSIONS_QUERY_FILTER: 'all'
    if (
      isVersionedContentType(model) &&
      params[VERSIONS_QUERY_FILTER] !== "all"
    ) {
      wrappedParams.filters = {
        $and: [{ isVisibleInListView: true }].concat(
          wrappedParams.filters || []
        ),
      };
    }

    return wrappedParams;
  },

  /**
   * Creates an entry & make links between it and its related versions and localizations
   * @param {string} uid - Model uid
   * @param {object} opts - Query options object (params, data, files, populate)
   */
  async create(uid, opts = {}) {
    const { isVersionedContentType } = getService("content-types");
    const model = strapi.getModel(uid);
    const collectionName = _.snakeCase(model.collectionName);
    const isLocalized = isLocalizedContentType(model);
    const { data } = opts;

    if (!isVersionedContentType(model)) {
      return service.create.call(this, uid, opts);
    }
    if (isLocalized && data.localizations?.length) {
      const relatedLocaleItem = await strapi.db.query(uid).findOne({
        where: {
          id: data.localizations[0],
        },
        populate: {
          createdBy: true,
        },
      });
      data.vuid = relatedLocaleItem.vuid;

      const latestInLocales = await strapi.db.connection.raw(
        `SELECT a.id, a.locale, a.version_number, a.published_at
        FROM ${collectionName} a WHERE NOT EXISTS (
          SELECT 1 FROM ${collectionName} WHERE locale != '${data.locale}' AND vuid=a.vuid AND (
           CASE WHEN a.published_at is null THEN (
             published_at is not null OR version_number > a.version_number
          )
          ELSE published_at is not null AND version_number > a.version_number
          END
          )
        ) AND vuid = '${data.vuid}'`
      );
      const latestByLocale = {};
      for (const latest of getLatestValueByDB(latestInLocales)) {
        const latestObj = latest?.[0] || {};
        if (latestObj?.locale) {
          latestByLocale[latestObj.locale] = latestObj.id;
        }
      }
      const localizations = Object.values(latestByLocale);
      if (localizations?.length > 0) {
        data.localizations = localizations;
      }
    } else if (!data.vuid) {
      data.vuid = uuid();
      data.versionNumber = 1;
      data.isVisibleInListView = true;
    }

    return await service.create.call(this, uid, opts);
  },
  /**
   * Updates an entry & update related versions
   * @param {string} uid
   * @param {string} entityId
   * @param {object} opts - Query options object (params, data, files, populate)
   */
  async update(uid, entityId, opts) {
    const { isVersionedContentType, createNewVersion } =
      getService("content-types");
    const model = strapi.getModel(uid);

    const item = await strapi.entityService.findOne(uid, entityId, { populate: model.__schema__.kind === "singleType" ? 'deep,3' : 'deep' });
    item.versions = item?.versions?.map((v) => v.id) || [];

    const { data } = opts;
    const isLocalized = isLocalizedContentType(model);
    const attrName = _.snakeCase(model.info.singularName);
    const collectionName = _.snakeCase(model.collectionName);
    const prevVersion = await strapi.db.query(uid).findOne({
      where: {
        id: entityId,
      },
    });

    if (!isVersionedContentType(model) || (data.hasOwnProperty("publishedAt") && !data.hasOwnProperty('preventCreate'))) {
      //Is not versioned content or is just publishing/unpublishing
      if (data.publishedAt && isVersionedContentType(model)) {
        const item = prevVersion;

        await strapi.db.query(uid).update({
          where: {
            id: item.id,
          },
          data: {
            isVisibleInListView: true,
          },
        });

        const where = {
          vuid: item.vuid,
          id: {
            $ne: item.id,
          },
        };
        if (isLocalized) where.locale = item.locale;
        await strapi.db.query(uid).updateMany({
          where,
          data: {
            publishedAt: null, // not when creating
            isVisibleInListView: false,
          },
        });

        // Relink logic for localizations
        if (isLocalized) {
          const latestInLocales = await strapi.db.connection.raw(
            `SELECT a.id, a.locale, a.version_number, a.published_at
        FROM ${collectionName} a WHERE NOT EXISTS (
          SELECT 1 FROM ${collectionName} WHERE locale=a.locale AND vuid=a.vuid AND (
           CASE WHEN a.published_at is null THEN (
             published_at is not null OR version_number > a.version_number
          )
          ELSE published_at is not null AND version_number > a.version_number
          END
          )
        ) AND vuid = '${item.vuid}'`
          );
          const latestByLocale = {};
          for (const latest of getLatestValueByDB(latestInLocales)) {
            const latestObj = latest?.[0] || latest || {};
            if (latestObj?.locale) {
              latestByLocale[latestObj.locale] = latestObj.id;
            }
          }

          // !set the current as latest in locale
          latestByLocale[item.locale] = item.id;
          let allVersionsOtherLocales = await strapi.db.query(uid).findMany({
            where: {
              vuid: item.vuid,
              locale: {
                $ne: item.locale,
              },
            },
          });

          allVersionsOtherLocales = allVersionsOtherLocales.sort((a, b) => {
            if (a.isVisibleInListView && !b.isVisibleInListView) {
              return -1;
            }
            if (a.id < b.id) {
              return 1;
            } else {
              return -1;
            }
          });

          let i = 0;
          for (const entity of allVersionsOtherLocales) {
            await strapi.db.connection.raw(
              `DELETE FROM ${collectionName}_localizations_links WHERE ${attrName}_id=${entity.id} OR inv_${attrName}_id=${entity.id}`
            );

            const latestIds = Object.values(
              _.omit(latestByLocale, entity.locale)
            );
            const sqlValues = [];
            latestIds.map(
              (latest) => {
                sqlValues.push(`(${entity.id}, ${latest}, ${i})`);
                sqlValues.push(`(${latest}, ${entity.id}, ${i})`);
              });
            if (!sqlValues?.length) continue;

            await strapi.db.connection.raw(
              `INSERT INTO ${collectionName}_localizations_links (${attrName}_id, inv_${attrName}_id, ${attrName}_order) VALUES ` +
                sqlValues.join(",")
            );
            i++;
          }
        }
      }
      return service.update.call(this, uid, entityId, opts);
    }
    if (!data.id) {
      return;
    }
    if (data.hasOwnProperty("preventCreate")) {
      return service.update.call(this, uid, entityId, opts);
    }

    data.locale = prevVersion.locale;
    let hasPublishedVersion = false;
    let olderVersions = [];
    const latestByLocale = {};

    const where = { vuid: data.vuid };
    if (isLocalized) where.locale = data.locale;

    olderVersions = await strapi.db.query(uid).findMany({
      where,
      populate: {
        createdBy: true,
      },
    });

    const latestVersion = _.maxBy(olderVersions, (v) => v.versionNumber);
    const latestVersionNumber = latestVersion && latestVersion.versionNumber;
    data.versionNumber = (latestVersionNumber || 0) + 1;

    try {
      if (olderVersions && olderVersions.length > 0) {
        // use relatedEntity data insted of olderVers ?!
        data.createdBy = olderVersions[0].createdBy.id;
      }
    } catch (e) {
      // Fallback set logged user ID
      data.createdBy = data.updatedBy;
    }
    // Select latest(or published) for each locale
    const latestQuery = getLatestRawQuery(model, data.vuid);
    const latestInLocales = await strapi.db.connection.raw(latestQuery);

    for (const latest of getLatestValueByDB(latestInLocales)) {
      // Is version the new latest in locale?
      const latestObj = latest?.[0] || latest || {};
      if (!isLocalized || data.locale === latestObj.locale) {
        hasPublishedVersion = !!latest.published_at;
      }
      if (latestObj?.locale) {
        latestByLocale[latestObj.locale] = latestObj.id;
      }
    }

    let updateData = {
      isVisibleInListView: false,
    };
    data.isVisibleInListView = true;
    if (data.publishedAt && hasPublishedVersion) {
      updateData.publishedAt = null;
    }
    if (isLocalized) where.locale = data.locale;
    await strapi.db.query(uid).updateMany({
      where: { vuid: data.vuid, ...(isLocalized && {locale: data.locale}) },
      data: updateData,
    });

    data.versions = olderVersions.map((v) => v.id);

    if (isLocalized) {
      // omit current locale
      data.localizations = Object.values(_.omit(latestByLocale, data.locale));
    }
    // remove old ids
    const newData = await createNewVersion(uid, data, model, item);

    // Create Version
    const result = await service.create.call(this, uid, {
      ...opts,
      data: {
        ...newData,
        publishedAt: null,
      },
    });

    // Relink all versions from other locales if result is The latest(published)!
    if (result.isVisibleInListView && isLocalized) {
      // !set the current as latest in locale
      latestByLocale[result.locale] = result.id;

      let allVersionsOtherLocales = await strapi.db.query(uid).findMany({
        where: {
          vuid: { $eq: result.vuid },
          // locale: {
          //   $ne: result.locale,
          // },
        },
      });
      await strapi.db.connection.raw(
        `DELETE FROM ${collectionName}_localizations_links WHERE ${attrName}_id=${result.id} OR inv_${attrName}_id=${result.id}`
      );

      let i = 0;
      const sqlValues = [];
      const sqlValsStr = [];
      for (const entity of allVersionsOtherLocales) {
        await strapi.db.connection.raw(
          `DELETE FROM ${collectionName}_localizations_links WHERE ${attrName}_id=${entity.id} OR inv_${attrName}_id=${entity.id}`
        );
      }
      allVersionsOtherLocales = allVersionsOtherLocales.sort((a, b) => {
        if (a.isVisibleInListView && !b.isVisibleInListView) {
          return -1;
        }
        if (a.id < b.id) {
          return 1;
        } else {
          return -1;
        }
      })
      for (const entity of allVersionsOtherLocales) {
        const latestIds = Object.values(_.omit(latestByLocale, entity.locale));
        latestIds.map(
          (latest) => {
            const strPred1 = `${entity.id},${latest}`;
            const strPred2 = `${latest},${entity.id}`;
            if (!sqlValsStr.includes(strPred1)) {
              sqlValues.push(`(${entity.id}, ${latest}, ${i})`);
              sqlValsStr.push(strPred1);
            }
            if (!sqlValsStr.includes(strPred2)) {
              sqlValues.push(`(${latest}, ${entity.id}, ${i})`);
              sqlValsStr.push(strPred2);
            }
          });
        i++;
      }
      try {
        if (sqlValues?.length > 0) {
          await strapi.db.connection.raw(
            `INSERT INTO ${collectionName}_localizations_links (${attrName}_id, inv_${attrName}_id, ${attrName}_order) VALUES ` +
            sqlValues.join(",")
          );
        }
      } catch (e) {
        console.log('ERR', e);
      }
    }

    await strapi.db.connection.raw(
      `DELETE FROM ${collectionName}_versions_links WHERE ${attrName}_id=${result.id} OR inv_${attrName}_id=${result.id}`
    );

    for (const version of olderVersions) {
      await strapi.db.connection.raw(
        `INSERT INTO ${collectionName}_versions_links (${attrName}_id, inv_${attrName}_id) VALUES (${version.id},${result.id}), (${result.id},${version.id})`
      );
    }
    return result;
  },

  /**
   * Deletes an entry & updates links between related localizations
   * @param {string} uid
   * @param {string} entityId
   * @param {object} opts - Query options object (params, data, files, populate)
   */
  async delete(uid, entityId, opts) {
    const model = strapi.getModel(uid);
    const attrName = _.snakeCase(model.info.singularName);
    const collectionName = _.snakeCase(model.collectionName);
    const isLocalized = isLocalizedContentType(model);
    const { isVersionedContentType } = getService("content-types");

    if (!isVersionedContentType(model)) {
      return service.delete.call(this, uid, entityId, opts);
    }

    const item = await strapi.db
      .query(uid)
      .findOne({ where: { id: entityId } });

    const where = { vuid: item.vuid };
    if (isLocalized) where.locale = item.locale;
    await strapi.db.query(uid).updateMany({
      where,
      data: {
        isVisibleInListView: false,
      },
    });

    // Relink logic for localizations
    if (isLocalized) {
      const latestInLocales = await strapi.db.connection.raw(
        `SELECT a.id, a.locale, a.version_number, a.published_at
        FROM ${collectionName} a WHERE NOT EXISTS (
          SELECT 1 FROM ${model.collectionName}
          WHERE locale=a.locale AND vuid=a.vuid AND id!='${item.id}'  AND (
          CASE WHEN a.published_at is null THEN (
            published_at is not null OR version_number > a.version_number
          )
          ELSE published_at is not null AND version_number > a.version_number
          END
          )
        ) AND vuid = '${item.vuid}' AND id!=${item.id}`
      );

      const latestByLocale = {};
      for (const latest of getLatestValueByDB(latestInLocales)) {
        latestByLocale[latest.locale] = latest.id;
      }

      if (latestByLocale[item.locale]) {
        await strapi.db.query(model.uid).update({
          where: {
            ...where,
            id: latestByLocale[item.locale],
          },
          data: {
            isVisibleInListView: true,
          },
        });
      }

      const allVersionsOtherLocales = await strapi.db.query(uid).findMany({
        where: {
          vuid: item.vuid,
          locale: {
            $ne: item.locale,
          },
        },
      });

      for (const entity of allVersionsOtherLocales) {
        await strapi.db.connection.raw(
          `DELETE FROM ${collectionName}_localizations_links WHERE ${attrName}_id=${entity.id}`
        );

        const latestIds = Object.values(_.omit(latestByLocale, entity.locale));
        const sqlValues = latestIds.map(
          (latest) => `(${entity.id}, ${latest})`
        );
        if (!sqlValues?.length) continue;

        try {
          await strapi.db.connection.raw(
            `INSERT INTO ${collectionName}_localizations_links (${attrName}_id, inv_${attrName}_id) VALUES ` +
            sqlValues.join(",")
          );
        } catch (e) {}
      }
    } else {
      const latestVersion = await strapi.db.connection.raw(
        `SELECT a.id, a.version_number, a.published_at
        FROM ${collectionName} a WHERE NOT EXISTS (
          SELECT 1 FROM ${model.collectionName}
          WHERE vuid=a.vuid AND id!='${item.id}'  AND (
          CASE WHEN a.published_at is null THEN (
            published_at is not null OR version_number > a.version_number
          )
          ELSE published_at is not null AND version_number > a.version_number
          END
          )
        ) AND vuid = '${item.vuid}' AND id!='${item.id}'`
      );
      if (getLatestValueByDB(latestVersion).length) {
        await strapi.db.query(model.uid).update({
          where: {
            ...where,
            id: getLatestValueByDB(latestVersion)[0].id,
          },
          data: {
            isVisibleInListView: true,
          },
        });
      }
    }
    return service.delete.call(this, uid, entityId, opts);
  },
});

module.exports = () => ({
  decorator,
});
