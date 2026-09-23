export const isYoutubeShortsUrl = (url?: string | null): boolean => {
    if (!url) return false;
    return /(?:youtube\.com|youtu\.be)\/shorts\//i.test(url);
};
