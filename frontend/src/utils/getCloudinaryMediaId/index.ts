export const getCloudinaryMediaId = (url: string) => {
    const first = url.slice(url.indexOf('upload') + 7);

    const second = first.slice(first.indexOf('/') + 1, first.lastIndexOf('.'));

    return second;
};
