import { revalidateTag as revalidateTagNext, cacheTag as cacheTagNext } from 'next/cache';

// Strapi content types singularName
export type TCacheTags =
    | 'article'
    | 'article-category'
    | 'menu'
    | 'page'
    | 'redirect'
    | 'system-resource'
    | 'template'
    | 'web-setting';

export const revalidateTag = (tag: TCacheTags, id?: string) => {
    if (id) {
        console.log(`🧹 Revalidating content for ${tag} item with id ${id}`);
        revalidateTagNext(`${tag}-${id}`, 'max');
    } else {
        console.log(`🧹 Revalidating all content for ${tag}`);
        revalidateTagNext(tag, 'max');
    }
};

export const cacheTag = (tag: TCacheTags, id?: string) => {
    if (id) {
        console.log(`💾 Caching content for ${tag} item with id ${id}`);
        cacheTagNext(`${tag}-${id}`, 'max');
    } else {
        console.log(`💾 Caching all content for ${tag}`);
        cacheTagNext(tag, 'max');
    }
};
