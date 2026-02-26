import { revalidateTag as revalidateTagNext, cacheTag as cacheTagNext } from 'next/cache';

// Strapi content types singularName
export type TCacheTags =
    | 'article'
    | 'article-category'
    | 'form-builder'
    | 'menu'
    | 'page'
    | 'redirect'
    | 'system-resource'
    | 'template'
    | 'web-setting';

export const revalidateTag = (tag: TCacheTags, id?: string) => {
    if (id) {
        console.log(`🧹 Revalidating content for ${tag} item with ID ${id}`);

        revalidateTagNext(`${tag}-${id}`, 'max');
    } else {
        console.log(`🧹 Revalidating all content for ${tag}`);

        revalidateTagNext(tag, 'max');
    }
};

export const cacheTag = (tag: TCacheTags, id?: string) => {
    if (id) {
        if (process.env.NODE_ENV === 'development') {
            console.log(`💾 Set cache tag for ${tag} item with ID ${id}`);
        }

        cacheTagNext(`${tag}-${id}`, 'max');
    } else {
        if (process.env.NODE_ENV === 'development') {
            console.log(`💾 Set cache tag for ${tag}`);
        }
        cacheTagNext(tag, 'max');
    }
};
