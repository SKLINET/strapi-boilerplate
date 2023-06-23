export const getTopOffset = (el: any): number => {
    let topOffset = 0;

    let element = el;
    while (element.localName !== 'body') {
        topOffset += element.offsetTop;
        element = element.parentNode;
    }

    return topOffset;
};

export const getLeftOffset = (el: any): number => {
    let topOffset = 0;

    let element = el;
    while (element.localName !== 'body') {
        topOffset += element.offsetLeft;
        element = element.parentNode;
    }

    return topOffset;
};
