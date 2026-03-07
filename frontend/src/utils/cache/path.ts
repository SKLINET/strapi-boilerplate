import { revalidatePath as revalidatePathNext } from 'next/cache';

/**
 * @description Revalidate all paths
 **/
export const revalidateAll = () => {
    if (process.env.NEXT_PUBLIC_ALLOW_REVALIDATE_LOGS === '1') {
        console.log(`🧹 Revalidating all paths`);
    }

    revalidatePathNext('/', 'layout');
    revalidatePathNext('/', 'page');
};

/**
 * @description Revalidate a specific path
 * @param {string} path - Path to revalidate
 **/
export const revalidatePath = (path: string) => {
    if (process.env.NEXT_PUBLIC_ALLOW_REVALIDATE_LOGS === '1') {
        console.log(`🧹 Revalidating path ${path}`);
    }
    revalidatePathNext(path);
};
