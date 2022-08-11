export const getLinkTarget = (target: string) => {
    if (target.includes('self')) {
        return '_self';
    }
    if (target.includes('blank')) {
        return '_blank';
    }

    return '_self';
};
