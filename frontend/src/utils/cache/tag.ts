import { revalidateTag as revalidateTagNext, cacheTag as cacheTagNext } from 'next/cache';

/**
 * @description Strapi content types singularName for cache tags
 **/
export type TCacheTags =
    | 'article'
    | 'article-category'
    | 'built-form'
    | 'menu'
    | 'page'
    | 'redirect'
    | 'system-resource'
    | 'template'
    | 'web-setting';

/**
 * @description Revalidate a specific tag and id
 * @param {TCacheTags} tag - Tag to revalidate
 * @param {string} id - ID of the item to revalidate
 **/
export const revalidateTag = (tag: TCacheTags, id?: string) => {
    if (id) {
        if (process.env.NEXT_PUBLIC_ALLOW_REVALIDATE_LOGS === '1') {
            console.log(`🧹 Revalidating content for ${tag} item with ID ${id}`);
        }

        revalidateTagNext(`${tag}-${id}`, { expire: 0 });
    } else {
        if (process.env.NEXT_PUBLIC_ALLOW_REVALIDATE_LOGS === '1') {
            console.log(`🧹 Revalidating all content for ${tag}`);
        }

        revalidateTagNext(tag, { expire: 0 });
    }
};

/**
 * @description Set cache tag for a given tag and id
 * @param {TCacheTags} tag - Tag to set
 * @param {string} id - ID of the item to set the tag for
 **/
export const cacheTag = (tag: TCacheTags, id?: string) => {
    if (id) {
        if (process.env.NEXT_PUBLIC_ALLOW_CACHE_LOGS === '1') {
            console.log(`💾 Set cache tag for ${tag} item with ID ${id}`);
        }

        cacheTagNext(`${tag}-${id}`, 'max');
    } else {
        if (process.env.NEXT_PUBLIC_ALLOW_CACHE_LOGS === '1') {
            console.log(`💾 Set cache tag for ${tag}`);
        }
        cacheTagNext(tag, 'max');
    }
};
