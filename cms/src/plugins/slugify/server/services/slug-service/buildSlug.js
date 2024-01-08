const slugify = require('@sindresorhus/slugify');

const buildSlug = async (string, settings, ctx) => {
	let slug = slugify(string, settings.slugifyOptions);

	// slugify with count
	if (!settings.slugifyWithCount) {
		return slug;
	}

	// const records = await strapi.db.query(ctx.model.uid).findMany({ filters: { vuid: { $eq: ctx.params.data.vuid }, slug: { $eq: slug }}});
	// if (Array.isArray(records) && records?.length > 0) {
	// 	return slug;
	// }

	const slugEntry = await strapi.db.query('plugin::slugify.slug').findOne({
		select: ['id', 'count'],
		where: { slug },
	});

	// if no result then count is 1 and base slug is returned
	if (!slugEntry) {
		await strapi.entityService.create('plugin::slugify.slug', {
			data: {
				slug,
				count: 1,
			},
		});

		return slug;
	}
	// const separator = settings.slugifyOptions.separator || '-';
	// const slug2 = `${slug}${separator}${slugEntry.count}`;
	// const records2 = await strapi.db.query(ctx.model.uid).findMany({ filters: { vuid: { $eq: ctx.params.data.vuid }, slug: { $eq: slug2 }}});
	// if (Array.isArray(records2) && records2?.length > 0) {
	// 	return slug2;
	// }

	const count = slugEntry.count + 1;
	await strapi.entityService.update('plugin::slugify.slug', slugEntry.id, {
		data: {
			count,
		},
	});

  const separator = settings.slugifyOptions.separator || '-';
	return `${slug}${separator}${count}`;
};

module.exports = {
	buildSlug,
};
