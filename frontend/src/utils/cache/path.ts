import { revalidatePath as revalidatePathNext } from 'next/cache';

export const revalidateAll = () => {
    console.log(`🧹 Revalidating all paths`);
    revalidatePathNext('/', 'layout');
    revalidatePathNext('/', 'page');
};

export const revalidatePath = (path: string) => {
    console.log(`🧹 Revalidating path ${path}`);
    revalidatePathNext(path);
};
