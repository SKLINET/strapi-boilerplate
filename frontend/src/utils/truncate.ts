export const truncate = (text: string, maxChars = 24) => {
    if (!text) return '';
    if (text.length <= maxChars + 3) return text;
    return text.slice(0, maxChars) + '...';
};
