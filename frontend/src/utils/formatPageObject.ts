export const formatPageObject = (url: string) => {
    return {
        data: {
            attributes: {
                url: url,
            },
        },
    };
};
